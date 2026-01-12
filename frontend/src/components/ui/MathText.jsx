import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import CSS directly here or in main.jsx

const MathText = ({ text, inline = false, className = '' }) => {
    // If text is null/undefined, render nothing
    if (!text) return null;

    // Custom renderers to apply Tailwind classes to specific elements
    const components = {
        p: ({ node, ...props }) => (
            <p className={`mb-2 last:mb-0 ${inline ? 'inline' : ''}`} {...props} />
        ),
        // Add more custom renderers if needed (lists, bold via **, etc.)
    };

    return (
        <div className={`math-content ${inline ? 'inline-block' : 'block'} ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={components}
            >
                {text}
            </ReactMarkdown>
        </div>
    );
};

export default MathText;
