import React, { useState } from 'react';
import {
  Plus,
  AlertTriangle,
  BarChart3,
  Send,
  X,
} from 'lucide-react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

interface Course {
  id: string;
  subject: string;
  type: 'CM' | 'TD' | 'TP';
  day: string;
  startTime: string;
  duration: number;
  room: string;
  teacher: string;
  filiere: string;
  level: string;
  status: 'valid' | 'conflict' | 'pending';
}

interface SubjectVolume {
  name: string;
  filiere: string;
  level: string;
  coeff: number;
  cm: { planned: number; total: number };
  td: { planned: number; total: number };
  tp: { planned: number; total: number };
}

// Mock data complet avec volumes horaires
const mockSubjects: SubjectVolume[] = [
  {
    name: 'Algorithmique',
    filiere: 'Informatique',
    level: 'Licence 1',
    coeff: 4,
    cm: { planned: 0, total: 30 },
    td: { planned: 0, total: 20 },
    tp: { planned: 0, total: 10 },
  },
  {
    name: 'Programmation Web',
    filiere: 'Informatique',
    level: 'Licence 2',
    coeff: 3,
    cm: { planned: 0, total: 20 },
    td: { planned: 0, total: 15 },
    tp: { planned: 0, total: 15 },
  },
  {
    name: 'Base de données',
    filiere: 'Informatique',
    level: 'Licence 2',
    coeff: 4,
    cm: { planned: 0, total: 25 },
    td: { planned: 0, total: 15 },
    tp: { planned: 0, total: 10 },
  },
  {
    name: 'Réseaux',
    filiere: 'Informatique',
    level: 'Licence 2',
    coeff: 3,
    cm: { planned: 0, total: 20 },
    td: { planned: 0, total: 15 },
    tp: { planned: 0, total: 0 },
  },
  {
    name: 'Système exploitation',
    filiere: 'Informatique',
    level: 'Licence 2',
    coeff: 3,
    cm: { planned: 0, total: 20 },
    td: { planned: 0, total: 10 },
    tp: { planned: 0, total: 10 },
  },
  {
    name: 'Mathématiques',
    filiere: 'Informatique',
    level: 'Licence 1',
    coeff: 4,
    cm: { planned: 0, total: 30 },
    td: { planned: 0, total: 20 },
    tp: { planned: 0, total: 0 },
  },
  {
    name: 'Statistiques',
    filiere: 'Informatique',
    level: 'Licence 1',
    coeff: 2,
    cm: { planned: 0, total: 15 },
    td: { planned: 0, total: 15 },
    tp: { planned: 0, total: 0 },
  },
];

const mockTeachers = [
  'Dr. Adéyemi',
  'Prof. Koffi',
  'Dr. Agossou',
  'M. Dossou',
  'Mme Hounkpè',
  'Dr. Zannou',
];

const mockRooms = [
  'Amphi A (300p)',
  'Salle 101',
  'Salle 102',
  'Laboratoire 1',
  'Laboratoire 2',
  'Salle Info 1',
];

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const timeSlots = [
  '07h-08h', '08h-09h', '09h-10h', '10h-11h', '11h-12h',
  '12h-13h', '13h-14h', '14h-15h', '15h-16h', '16h-17h', '17h-18h', '18h-19h'
];

const TimetablePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjectVolumes, setSubjectVolumes] = useState<SubjectVolume[]>(mockSubjects);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterTeacher, setFilterTeacher] = useState('Tous');
  const [draggedCourse, setDraggedCourse] = useState<Course | null>(null);
  const [selectedFilliere, setSelectedFilliere] = useState('Informatique');
  const [selectedSemester, setSelectedSemester] = useState('Semestre 1');

  const [newCourse, setNewCourse] = useState({
    subject: '',
    type: 'CM' as 'CM' | 'TD' | 'TP',
    day: 'Lundi',
    startTime: '08h-09h',
    duration: 1,
    room: '',
    teacher: '',
  });

  // Couleurs par type de cours
  const typeColors = {
    CM: 'bg-blue-500 border-blue-600',
    TD: 'bg-green-500 border-green-600',
    TP: 'bg-orange-500 border-orange-600',
  };

  const detectConflict = (course: Course): boolean => {
    return courses.some(c =>
      c.day === course.day &&
      c.room === course.room &&
      c.startTime === course.startTime &&
      c.id !== course.id
    ) || courses.some(c =>
      c.day === course.day &&
      c.teacher === course.teacher &&
      c.startTime === course.startTime &&
      c.id !== course.id
    );
  };

  const handleAddCourse = () => {
    if (!newCourse.subject || !newCourse.room || !newCourse.teacher) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const subject = subjectVolumes.find(s => s.name === newCourse.subject);
    if (!subject) return;

    // Vérifier dépassement de volume
    const typeKey = newCourse.type.toLowerCase() as 'cm' | 'td' | 'tp';
    if (subject[typeKey].planned + newCourse.duration > subject[typeKey].total) {
      alert(`Dépassement du volume ${newCourse.type} pour ${newCourse.subject}`);
      return;
    }

    const course: Course = {
      id: Date.now().toString(),
      subject: newCourse.subject,
      type: newCourse.type,
      day: newCourse.day,
      startTime: newCourse.startTime,
      duration: newCourse.duration,
      room: newCourse.room,
      teacher: newCourse.teacher,
      filiere: subject.filiere,
      level: subject.level,
      status: 'pending',
    };

    const hasConflict = detectConflict(course);
    if (hasConflict) {
      course.status = 'conflict';
    }

    setCourses([...courses, course]);

    // Update volumes
    const updatedVolumes = subjectVolumes.map(s => {
      if (s.name === newCourse.subject) {
        const updated = { ...s };
        updated[typeKey].planned += newCourse.duration;
        return updated;
      }
      return s;
    });
    setSubjectVolumes(updatedVolumes);

    setNewCourse({ subject: '', type: 'CM', day: 'Lundi', startTime: '08h-09h', duration: 1, room: '', teacher: '' });
    setShowAddModal(false);
  };

  const handleDragStart = (course: Course) => {
    setDraggedCourse(course);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (day: string, time: string) => {
    if (!draggedCourse) return;

    const oldCourse = courses.find(c => c.id === draggedCourse.id);
    if (!oldCourse) return;

    // Vérifier les conflits à la nouvelle position
    const updatedCourse = { ...draggedCourse, day, startTime: time };
    const hasConflict = courses.some(c =>
      c.id !== draggedCourse.id &&
      c.day === day &&
      c.startTime === time &&
      (c.room === draggedCourse.room || c.teacher === draggedCourse.teacher)
    );

    setCourses(courses.map(c =>
      c.id === draggedCourse.id
        ? { ...updatedCourse, status: hasConflict ? 'conflict' : 'pending' }
        : c
    ));

    setDraggedCourse(null);
  };

  const handleDeleteCourse = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;

    // Libérer les heures
    const typeKey = course.type.toLowerCase() as 'cm' | 'td' | 'tp';
    setSubjectVolumes(subjectVolumes.map(s => {
      if (s.name === course.subject) {
        const updated = { ...s };
        updated[typeKey].planned -= course.duration;
        return updated;
      }
      return s;
    }));

    setCourses(courses.filter(c => c.id !== id));
  };

  const conflictCount = courses.filter(c => c.status === 'conflict').length;
  const canSubmit = courses.length > 0 && conflictCount === 0;

  const getCourseAtSlot = (day: string, time: string) => {
    return courses.filter(c => c.day === day && c.startTime === time);
  };

  return (
    <main className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <SurveillantTopbar
        title="Emplois du temps"
        subtitle="Grille hebdomadaire avec volumes horaires et détection de conflits"
        rightSlot={
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#1342A1] px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition"
          >
            <Plus className="h-4 w-4" />
            + Ajouter une séance
          </button>
        }
      />

      <div className="space-y-6 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        {/* Top Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cours placés</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{courses.length}</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Validés</p>
            <p className="text-3xl font-bold text-emerald-700 mt-2">{courses.filter(c => c.status === 'valid').length}</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">À vérifier</p>
            <p className="text-3xl font-bold text-amber-700 mt-2">{courses.filter(c => c.status === 'pending').length}</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conflits</p>
            <p className="text-3xl font-bold text-rose-700 mt-2">{conflictCount}</p>
          </div>
        </div>

        {/* Alerte conflits */}
        {conflictCount > 0 && (
          <div className="rounded-2xl border-l-4 border-rose-400 bg-gradient-to-r from-rose-50 to-red-50 p-4 flex items-start gap-4">
            <AlertTriangle className="h-5 w-5 text-rose-600 mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-rose-900">⚠️ {conflictCount} conflit(s) détecté(s)</h3>
              <p className="text-sm text-rose-700 mt-1">Les cours en rouge se chevauchent. Déplacez-les pour résoudre les conflits avant de soumettre.</p>
            </div>
          </div>
        )}

        {/* Filtres & Sélecteurs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Filière</label>
              <select
                value={selectedFilliere}
                onChange={(e) => setSelectedFilliere(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white font-medium text-slate-900 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"
              >
                <option>Informatique</option>
                <option>Génie Logiciel</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Semestre</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white font-medium text-slate-900 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"
              >
                <option>Semestre 1</option>
                <option>Semestre 2</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Filtrer par enseignant</label>
              <select
                value={filterTeacher}
                onChange={(e) => setFilterTeacher(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white font-medium text-slate-900 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"
              >
                <option>Tous</option>
                {mockTeachers.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grille hebdomadaire */}
        <div className="rounded-3xl border border-slate-300 bg-white shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-4">
            <h2 className="text-lg font-bold text-white">📋 Planning hebdomadaire</h2>
            <p className="text-xs text-slate-300 mt-1">Glissez-déposez les cours pour les repositionner • Les conflits s'affichent en rouge</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-16 border border-slate-300 bg-slate-100 text-slate-700 p-3 font-bold text-xs">Heure</th>
                  {days.map(day => (
                    <th key={day} className="border border-slate-300 bg-slate-100 text-slate-700 p-3 font-bold text-xs w-28 text-center">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, idx) => (
                  <tr key={time} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="border border-slate-300 bg-slate-800 text-white p-3 font-bold text-xs text-center sticky left-0 z-10">
                      {time}
                    </td>
                    {days.map(day => (
                      <td
                        key={`${day}-${time}`}
                        className="border border-slate-300 p-2 h-28 align-top relative"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(day, time)}
                      >
                        <div className="space-y-1.5 h-full">
                          {getCourseAtSlot(day, time)
                            .filter(c => filterTeacher === 'Tous' || c.teacher === filterTeacher)
                            .map(course => (
                              <div
                                key={course.id}
                                draggable
                                onDragStart={() => handleDragStart(course)}
                                className={`p-2.5 rounded-lg border-2 cursor-grab active:cursor-grabbing text-xs font-semibold shadow-md hover:shadow-lg transition group relative overflow-hidden ${
                                  course.status === 'conflict'
                                    ? 'bg-rose-500 border-rose-700 text-white animate-pulse'
                                    : `${typeColors[course.type]} text-white`
                                }`}
                              >
                                <div className="font-bold leading-tight">{course.subject}</div>
                                <div className="text-xs opacity-90 leading-tight">{course.type}</div>
                                <div className="text-xs opacity-80 leading-tight truncate">{course.teacher.split(' ')[1]}</div>
                                <div className="text-xs opacity-80 leading-tight truncate">{course.room}</div>
                                {course.status === 'conflict' && (
                                  <div className="text-xs font-bold mt-1 bg-white/20 px-2 py-0.5 rounded inline-block">
                                    ⚠️ Conflit
                                  </div>
                                )}
                                <button
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition bg-black/40 hover:bg-black/60 rounded-full p-1"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Suivi des volumes horaires */}
        <div className="rounded-3xl border border-slate-300 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            📊 Bilan des volumes horaires placés
          </h2>

          <div className="space-y-3">
            {subjectVolumes.map(subject => {
              const totalPlanned = subject.cm.planned + subject.td.planned + subject.tp.planned;
              const totalHours = subject.cm.total + subject.td.total + subject.tp.total;
              const progress = (totalPlanned / totalHours) * 100;

              return (
                <div key={subject.name} className="rounded-xl bg-slate-700/40 border border-slate-600 p-4 hover:bg-slate-700/60 transition">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-base text-white">{subject.name}</h3>
                      <p className="text-xs text-slate-400">{subject.filiere} • {subject.level}</p>
                    </div>
                    <span className="bg-slate-600 px-3 py-1 rounded-full text-xs font-bold text-slate-200">
                      Coeff. {subject.coeff}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {/* CM */}
                    <div className="bg-blue-600/20 border border-blue-500/50 rounded-lg p-3">
                      <p className="text-xs text-blue-300 font-bold mb-1">CM</p>
                      <p className="text-sm font-bold text-white">{subject.cm.planned}h <span className="text-xs text-slate-400">/ {subject.cm.total}h</span></p>
                      <div className="mt-2 bg-blue-900/40 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-500"
                          style={{ width: `${Math.min((subject.cm.planned / subject.cm.total) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* TD */}
                    <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-3">
                      <p className="text-xs text-green-300 font-bold mb-1">TD</p>
                      <p className="text-sm font-bold text-white">{subject.td.planned}h <span className="text-xs text-slate-400">/ {subject.td.total}h</span></p>
                      <div className="mt-2 bg-green-900/40 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500"
                          style={{ width: `${Math.min((subject.td.planned / subject.td.total) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* TP */}
                    <div className="bg-orange-600/20 border border-orange-500/50 rounded-lg p-3">
                      <p className="text-xs text-orange-300 font-bold mb-1">TP</p>
                      <p className="text-sm font-bold text-white">{subject.tp.planned}h <span className="text-xs text-slate-400">/ {subject.tp.total}h</span></p>
                      <div className="mt-2 bg-orange-900/40 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500"
                          style={{ width: `${Math.min((subject.tp.planned / subject.tp.total) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="text-slate-400">
                      {totalPlanned}h / {totalHours}h placées
                    </div>
                    <div className="bg-slate-600/50 px-2 py-1 rounded font-bold text-slate-200">
                      {Math.round(progress)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bouton Soumettre */}
        <div className="flex gap-3">
          <button
            disabled={!canSubmit}
            className={`flex-1 rounded-2xl px-6 py-4 text-base font-bold text-white transition flex items-center justify-center gap-2 ${
              canSubmit
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                : 'bg-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <Send className="h-5 w-5" />
            {canSubmit ? '✓ Soumettre à l\'administration' : 'Résolvez les conflits avant de soumettre'}
          </button>
        </div>
      </div>

      {/* Modal Ajouter une séance */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-6 text-white flex items-center justify-between rounded-t-3xl">
              <div>
                <h3 className="text-2xl font-bold">➕ Ajouter une séance</h3>
                <p className="text-sm text-slate-300 mt-1">Remplissez tous les champs pour créer une nouvelle séance</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-300 hover:text-white hover:bg-slate-600/40 rounded-lg p-2 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Afficher les heures restantes */}
              {newCourse.subject && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-blue-900 uppercase mb-2">Heures restantes pour ce type</p>
                  <div className="text-sm text-blue-900 font-semibold">
                    {(() => {
                      const subject = subjectVolumes.find(s => s.name === newCourse.subject);
                      if (!subject) return 'N/A';
                      const typeKey = newCourse.type.toLowerCase() as 'cm' | 'td' | 'tp';
                      const remaining = subject[typeKey].total - subject[typeKey].planned;
                      return `${remaining}h restantes / ${subject[typeKey].total}h`;
                    })()}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {/* Matière */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">📚 Matière</label>
                  <select
                    value={newCourse.subject}
                    onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm bg-white font-medium focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition"
                  >
                    <option value="">Sélectionner une matière</option>
                    {subjectVolumes.map(s => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">📝 Type</label>
                  <select
                    value={newCourse.type}
                    onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value as 'CM' | 'TD' | 'TP' })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm bg-white font-medium focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition"
                  >
                    <option value="CM">CM - Cours magistral</option>
                    <option value="TD">TD - Travaux dirigés</option>
                    <option value="TP">TP - Travaux pratiques</option>
                  </select>
                </div>

                {/* Jour */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">📅 Jour</label>
                  <select
                    value={newCourse.day}
                    onChange={(e) => setNewCourse({ ...newCourse, day: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm bg-white font-medium focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition"
                  >
                    {days.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Créneau */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">⏰ Créneau</label>
                  <select
                    value={newCourse.startTime}
                    onChange={(e) => setNewCourse({ ...newCourse, startTime: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm bg-white font-medium focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Durée */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">⏱️ Durée (h)</label>
                  <input
                    type="number"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm bg-white font-medium focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition"
                    min="1"
                    max="4"
                  />
                </div>

                {/* Salle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">🚪 Salle</label>
                  <select
                    value={newCourse.room}
                    onChange={(e) => setNewCourse({ ...newCourse, room: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm bg-white font-medium focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition"
                  >
                    <option value="">Sélectionner une salle</option>
                    {mockRooms.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Enseignant */}
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">👨‍🏫 Enseignant</label>
                  <select
                    value={newCourse.teacher}
                    onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm bg-white font-medium focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition"
                  >
                    <option value="">Sélectionner un enseignant</option>
                    {mockTeachers.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={handleAddCourse}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#1342A1] px-6 py-3 text-sm font-bold text-white transition hover:shadow-lg active:scale-95"
                >
                  ✓ Placer la séance
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default TimetablePage;
