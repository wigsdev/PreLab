import { Routes, Route, useLocation } from 'react-router-dom';
import HomeView from './views/HomeView';
import ExamView from './views/ExamView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import { AuthProvider } from './context/AuthContext';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        <main className="container mx-auto px-4 py-4">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/exam" element={<ExamView />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
