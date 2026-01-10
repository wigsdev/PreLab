import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'; // [NEW]
import useTheme from './hooks/useTheme';
import Navbar from './components/layout/Navbar';
import HomeView from './views/HomeView';
import ExamView from './views/ExamView';
import DashboardView from './views/DashboardView';
import ProfileView from './views/ProfileView'; // [NEW]
import CreateQuestionView from './views/admin/CreateQuestionView'; // [NEW]
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
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
              <Route path="/profile" element={
                <PrivateRoute>
                  <ProfileView />
                </PrivateRoute>
              } />
              <Route path="/admin/create" element={
                <PrivateRoute>
                  <CreateQuestionView />
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
