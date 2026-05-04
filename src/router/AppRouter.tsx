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
import EnseignantDashboardPage from '../pages/dashboard/enseignant'
import EnseignantSidebar from '../components/enseignant/EnseignantSidebar'
import CentersPage from '../pages/dashboard/admin/pages/CentersPage'
import StudentsPage from '../pages/dashboard/admin/pages/StudentsPage'
import AdminEvaluationsPage from '../pages/dashboard/admin/pages/EvaluationsPage'
import AdminTeachersPage from '../pages/dashboard/admin/pages/TeachersPage'
import AdminPerformancesPage from '../pages/dashboard/admin/pages/PerformancesPage'
import AdminMatieresPage from '../pages/dashboard/admin/pages/MatieresPage'
import SurveillantsPage from '../pages/dashboard/admin/pages/SurveillantsPage'
import SurveillantSidebar from '../components/surveillant/SurveillantSidebar'
import SurveillantDashboardPage from '../pages/dashboard/surveillant'
import TimetablePage from '../pages/dashboard/surveillant/timetable'
import CoursesPage from '../pages/dashboard/surveillant/courses'
import AssignTeachersPage from '../pages/dashboard/surveillant/assign-teachers'
import AssignRoomsPage from '../pages/dashboard/surveillant/assign-rooms'
import ConflictsPage from '../pages/dashboard/surveillant/conflicts'
import AbsencesPage from '../pages/dashboard/surveillant/absences'
import ReportsPage from '../pages/dashboard/surveillant/reports'
import MissionsPage from '../pages/dashboard/surveillant/missions'
import EvaluationsPageSurv from '../pages/dashboard/surveillant/evaluations'
import CalendarPageSurv from '../pages/dashboard/surveillant/calendar'
import NotificationsPageSurv from '../pages/dashboard/surveillant/notifications'
import SecretaireSidebar from '../components/secretaire/SecretaireSidebar'
import SecretaireDashboardPage from '../pages/dashboard/secretaire'
import EnseignantEvaluationsPage from '../pages/dashboard/enseignant/EvaluationsPage'
import EnseignantMatieresPage from '../pages/dashboard/enseignant/MatieresPage'
import EnseignantClassesPage from '../pages/dashboard/enseignant/ClassesPage'
import EnseignantCalendarPage from '../pages/dashboard/enseignant/CalendarPage'
import EnseignantNotificationsPage from '../pages/dashboard/enseignant/NotificationsPage'
import EnseignantMessagesPage from '../pages/dashboard/enseignant/MessagesPage'

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

      {/* Espace secretaire */}
      <Route
        path="/dashboard/secretaire/*"
        element={
          <DashboardLayout>
            <SecretaireSidebar />
            <Routes>
              <Route index element={<SecretaireDashboardPage />} />
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

      {/* Espace enseignant (French naming: "enseignant") */}
      <Route
        path="/dashboard/enseignant/*"
        element={
          <DashboardLayout>
            <EnseignantSidebar />
            <Routes>
              <Route index element={<EnseignantDashboardPage />} />
              <Route path="evaluations" element={<EnseignantEvaluationsPage />} />
              <Route path="matieres" element={<EnseignantMatieresPage />} />
              <Route path="classes" element={<EnseignantClassesPage />} />
              <Route path="calendar" element={<EnseignantCalendarPage />} />
              <Route path="notifications" element={<EnseignantNotificationsPage />} />
              <Route path="messages" element={<EnseignantMessagesPage />} />
            </Routes>
          </DashboardLayout>
        }
      />

      {/* Espace surveillant */}
      <Route
        path="/dashboard/surveillant/*"
        element={
          <DashboardLayout>
            <SurveillantSidebar />
            <Routes>
              <Route index element={<SurveillantDashboardPage />} />
              <Route path="timetable" element={<TimetablePage />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="assign-teachers" element={<AssignTeachersPage />} />
              <Route path="assign-rooms" element={<AssignRoomsPage />} />
              <Route path="conflicts" element={<ConflictsPage />} />
              <Route path="absences" element={<AbsencesPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="missions" element={<MissionsPage />} />
              <Route path="evaluations" element={<EvaluationsPageSurv />} />
              <Route path="calendar" element={<CalendarPageSurv />} />
              <Route path="notifications" element={<NotificationsPageSurv />} />
            </Routes>
          </DashboardLayout>
        }
      />
    </Routes>



  </BrowserRouter>

  
)

export default AppRouter
