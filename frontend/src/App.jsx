import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'; // [NEW]
import useTheme from './hooks/useTheme';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import HomeView from './views/HomeView';
import ExamView from './views/ExamView';
import DashboardView from './views/DashboardView';
import ProfileView from './views/ProfileView'; // [NEW]
import CreateQuestionView from './views/admin/CreateQuestionView';
import EditQuestionView from './views/admin/EditQuestionView'; // [NEW]
import QuestionListView from './views/admin/QuestionListView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Rutas Públicas y de Estudiante (con Navbar) */}
          <Route element={<MainLayout theme={theme} toggleTheme={toggleTheme} />}>
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
          </Route>

          {/* Rutas de Admin (con Sidebar) */}
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route path="create" element={<CreateQuestionView />} />
            <Route path="questions" element={<QuestionListView />} />
            <Route path="questions/:id/edit" element={<EditQuestionView />} />
            <Route path="users" element={<div className="text-white">Próximamente: Gestión de Usuarios</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
