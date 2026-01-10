import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useTheme from './hooks/useTheme';
import Navbar from './components/layout/Navbar';
import HomeView from './views/HomeView';
import ExamView from './views/ExamView';
import DashboardView from './views/DashboardView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <div className="max-w-5xl mx-auto px-4 py-4">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/exam" element={<ExamView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <DashboardView />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
