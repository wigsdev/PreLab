import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import ExamView from './views/ExamView';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/exam" element={<ExamView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
