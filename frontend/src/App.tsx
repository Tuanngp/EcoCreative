
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './contents/pages/auth/login/LoginPage';
import SignUpPage from './contents/pages/auth/register/SignUpPage';
import HomePage from './contents/pages/home/HomePage';
import MarketplacePage from './contents/pages/marketplace/MarketplacePage';
import UserProfile from './contents/pages/auth/profile/UserProfile';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path='/profile' element={<UserProfile />} />
          {/* <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Route path="/dashboard" component={DashboardPage} /> */}
        </Routes>
      </BrowserRouter>
  );
}
export default App;
