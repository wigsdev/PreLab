import re
import json
import os

def parse_markdown_to_json(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    questions = []
    # Split by "### Pregunta"
    raw_questions = re.split(r'### Pregunta \d+', content)[1:] # Skip preamble

    for index, q_text in enumerate(raw_questions, 1):
        try:
            # Extract Statement
            statement_match = re.search(r'\*\*Enunciado:\*\*\s*(.*?)\s*\*\*Opciones:\*\*', q_text, re.DOTALL)
            if not statement_match:
                print(f"Skipping question {index}: No statement found")
                continue
            statement = statement_match.group(1).strip()

            # Extract Options
            options_match = re.search(r'\*\*Opciones:\*\*\s*(.*?)\s*\*\*Marca Visual:\*\*', q_text, re.DOTALL)
            if not options_match:
                print(f"Skipping question {index}: No options found")
                continue
            
            options_raw = options_match.group(1).strip().split('\n')
            options = []
            valid_option_prefixes = ['a)', 'b)', 'c)', 'd)', 'e)']
            
            for opt_line in options_raw:
                opt_line = opt_line.strip()
                if not opt_line: continue
                # Remove prefix "a) "
                for prefix in valid_option_prefixes:
                    if opt_line.startswith(prefix):
                        options.append(opt_line[len(prefix):].strip())
                        break

            # Extract Correct Answer
            correct_match = re.search(r'\*\*Marca Visual:\*\*\s*([a-e-])', q_text)
            correct_char = correct_match.group(1) if correct_match else '-'
            correct_index = -1
            if correct_char != '-' and 'a' <= correct_char <= 'e':
                 correct_index = ord(correct_char) - ord('a')

            # Extract Solution
            solution_match = re.search(r'\*\*Solución:\*\*\s*(.*?)(\n---|Z)', q_text, re.DOTALL) # Z is end of string fallback
            solution = solution_match.group(1).strip() if solution_match else ""

            q_obj = {
                "course": "Álgebra",
                "topic": "Teoría de Exponentes", # Asumido del encabezado
                "statement": statement,
                "difficulty": "INTERMEDIO",
                "explanation": solution,
                "options": []
            }

            for i, opt_text in enumerate(options):
                q_obj["options"].append({
                    "text": opt_text,
                    "is_correct": (i == correct_index)
                })

            questions.append(q_obj)

        except Exception as e:
            print(f"Error parsing question {index}: {e}")

    # Ensure directory exists
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=4)
    
    print(f"Successfully exported {len(questions)} questions to {output_file}")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(current_dir)
    input_path = os.path.join(project_root, 'docs', 'analysis', 'ALGEBRA.md')
    output_path = os.path.join(project_root, 'backend', 'core', 'fixtures', 'algebra_questions.json')
    
    print(f"Reading from: {input_path}")
    parse_markdown_to_json(input_path, output_path)
