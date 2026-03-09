import { Route, Routes } from 'react-router-dom';
import ProtectedTemplate from '../components/templates/protected/index';
import Dashboard from '../components/pages/protected/dashboard/index';
import ContactPage from '../components/pages/protected/contact';
import DailyRecordsPage from '../components/pages/protected/dailyRecords';
import DzikirCollectionPage from '../components/pages/protected/dzikirCollection';
import IslamCalendarPage from '../components/pages/protected/islamCalender';
import LeaderBoardPage from '../components/pages/protected/leaderBoard';
import MemorizeMurajaahPage from '../components/pages/protected/memorizeMurajaah';
import MemorizeRecordPage from '../components/pages/protected/memorizeRecord';
import QuranDigitalPage from '../components/pages/protected/quranDigital';
import UsersPage from '../components/pages/protected/users';
import ProfilePage from '../components/pages/protected/profile';
import SettingsPage from '../components/pages/protected/settings';
import ChangePasswordPage from '../components/pages/protected/changePass';
const ProtectedRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedTemplate />}>
          {/* Define protected routes here */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="daily-records" element={<DailyRecordsPage />} />
          <Route path="dzikir-collection" element={<DzikirCollectionPage />} />
          <Route path="islam-calendar" element={<IslamCalendarPage />} />
          <Route path="leader-board" element={<LeaderBoardPage />} />
          <Route path="memorize-murajaah" element={<MemorizeMurajaahPage />} />
          <Route path="memorize-record" element={<MemorizeRecordPage />} />
          <Route path="quran-digital" element={<QuranDigitalPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="profile-page" element={<ProfilePage />} />
          <Route path="settings-page" element={<SettingsPage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default ProtectedRoute;
