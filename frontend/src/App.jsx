import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import useTheme from './hooks/useTheme';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import HomeView from './views/HomeView';
import LandingView from './views/LandingView'; // [NEW]
import ExamView from './views/ExamView';
import ExamReviewView from './views/ExamReviewView'; // [NEW]
import DashboardView from './views/DashboardView';
import ProfileView from './views/ProfileView';
import CreateQuestionView from './views/admin/CreateQuestionView';
import AdminDashboard from './views/admin/AdminDashboard';
import EditQuestionView from './views/admin/EditQuestionView';
import QuestionListView from './views/admin/QuestionListView';
import UserListView from './views/admin/UserListView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import PrivateRoute from './components/PrivateRoute';

// Componente para decidir qué mostrar en la raíz
function RootDispatcher() {
  const { user } = useAuth();
  // Si hay usuario, mostramos la Home (Selección de Examen) dentro del Layout
  // Si no, mostramos la Landing Page (sin Layout o con uno distinto)
  if (user) {
    return <HomeView />; // El Layout lo pone el Route padre si configuramos bien, o lo incluimos aquí
    // Problema: Si RootDispatcher está fuera del Route Layout, necesitamos incluir Layout aquí.
    // Solución: Usaremos MainLayout como Wrapper manual si es usuario.
  }
  return <LandingView />;
}

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Rutas Públicas y de Estudiante */}
          <Route element={<MainLayout theme={theme} toggleTheme={toggleTheme} />}>
            {/* Raíz Inteligente: Landing vs Home */}
            <Route path="/" element={<RootDispatcher />} />

            {/* Ruta explícita para invitados que quieren practicar sin cuenta */}
            <Route path="/practice" element={<HomeView />} />

            <Route path="/exam" element={<ExamView />} />
            <Route path="/exam/review/:id" element={
              <PrivateRoute>
                <ExamReviewView />
              </PrivateRoute>
            } />

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

          {/* Rutas de Admin */}
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="create" element={<CreateQuestionView />} />
            <Route path="questions" element={<QuestionListView />} />
            <Route path="questions/:id/edit" element={<EditQuestionView />} />
            <Route path="users" element={<UserListView />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
