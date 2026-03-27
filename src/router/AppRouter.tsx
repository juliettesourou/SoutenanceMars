import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Sidebar from '../components/super-admin/navigation/Sidebar'
import AdminSidebar from '../components/adminCEntre/AdminSidebar'
import {
  DashboardPage,
  CalendarPage,
  SitesPage,
  StudentDetailsPage,
  TeachersPage,
  FilieresPage,
  SallePage,
  AnneeEtudePage,
  MatieresPage,
  OrganisationPage,
  EvaluationsPage,
  DemandesPage,
  PerformancesPage,
  CommunicationPage,
  UsersPage,
} from '../pages/super-admin'
import HomePage from '../pages/public/HomePage'
import AdminDashboardPage from '../pages/dashboard/admin'
import CentersPage from '../pages/dashboard/admin/pages/CentersPage'
import StudentsPage from '../pages/dashboard/admin/pages/StudentsPage'
import AdminEvaluationsPage from '../pages/dashboard/admin/pages/EvaluationsPage'
import AdminTeachersPage from '../pages/dashboard/admin/pages/TeachersPage'
import AdminPerformancesPage from '../pages/dashboard/admin/pages/PerformancesPage'
import AdminMatieresPage from '../pages/dashboard/admin/pages/MatieresPage'
import SurveillantsPage from '../pages/dashboard/admin/pages/SurveillantsPage'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Espace public / landing */}
      <Route path="/home" element={<HomePage />} />

      {/* Redirection racine */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Espace applicatif protégé avec layout + sidebar */}
      <Route
        path="/*"
        element={
          <DashboardLayout>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/sites" element={<SitesPage />} />
              <Route path="/students" element={<StudentDetailsPage />} />
              <Route path="/teachers" element={<TeachersPage />} />
              <Route path="/filieres" element={<FilieresPage />} />
              <Route path="/salles" element={<SallePage />} />
              <Route path="/annees-etude" element={<AnneeEtudePage />} />
              <Route path="/matieres" element={<MatieresPage />} />
              <Route path="/organisation" element={<OrganisationPage />} />
              <Route path="/evaluations" element={<EvaluationsPage />} />
              <Route path="/demandes" element={<DemandesPage />} />
              <Route path="/performances" element={<PerformancesPage />} />
              <Route path="/communication" element={<CommunicationPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Routes>
          </DashboardLayout>
        }
      />

      {/* Espace admin centre */}
      <Route
        path="/dashboard/admin/*"
        element={
          <DashboardLayout>
            <AdminSidebar />
            <Routes>
              <Route index element={<AdminDashboardPage />} />
              <Route path="etudiants" element={<StudentsPage />} />
              <Route path="evaluations" element={<AdminEvaluationsPage />} />
              <Route path="enseignants" element={<AdminTeachersPage />} />
              <Route path="surveillants" element={<SurveillantsPage />} />
              <Route path="matieres" element={<AdminMatieresPage />} />
              <Route path="performances" element={<AdminPerformancesPage />} />
              <Route path="centres" element={<CentersPage />} />
            </Routes>
          </DashboardLayout>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default AppRouter
