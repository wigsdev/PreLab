import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import HomeView from './views/HomeView';
import ExamView from './views/ExamView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <Navbar />
          <div className="max-w-5xl mx-auto px-4 py-4">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/exam" element={<ExamView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}
