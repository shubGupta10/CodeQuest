import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Askquestion from './pages/Askquestion/Askquestion';
import Auth from './pages/Auth/Auth';
import Question from './pages/Question/Question';
import Displayquestion from './pages/Question/Displayquestion';
import Tags from './pages/Tags/Tags';
import Users from './pages/Users/Users';
import Userprofile from './pages/Userprofile/Userprofile';
import PasswordReset from './Comnponent/PasswordReset/PasswordReset';
import ForgotPassword from './Comnponent/PasswordReset/ForgotPassword';
import ChooseOption from './Comnponent/PasswordReset/ChooseOption';
import SendOTP from './Comnponent/PasswordReset/PasswordWithOTP/SendOTP';
import VerifyOTP from './Comnponent/PasswordReset/PasswordWithOTP/VerifyOTP';
import SendOtpPage from './Comnponent/LanguageSwitcher/SendOTPPage';
import VerifyOtpPage from './Comnponent/LanguageSwitcher/VerifyOTPPage';
import ColorSwitcher from './Comnponent/ColorSwitcher';
import UserInfo from './Comnponent/BrowserAndOSDetection/UserInfo';
import EmailOtpForm from './Comnponent/BrowserAndOSDetection/EmailOtpForm';
import VerifyOtpForm from './Comnponent/BrowserAndOSDetection/VerifyEmailOTP';
import "./index.css"

function Allroutes({ slidein, handleslidein }) {
  const [accessDenied, setAccessDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccessRestrictions = () => {
      const userProfile = JSON.parse(localStorage.getItem('Profile'));
      if (!userProfile || !userProfile.result._id) {
        console.error('User profile or ID not found in localStorage');
        navigate('/Auth'); 
        return;
      }

      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const isMobile = /Android|mobile/i.test(navigator.userAgent);

      if (isMobile && (currentHour < 10 || currentHour >= 13)) {
        setAccessDenied(true);
        return;
      }
    };

    checkAccessRestrictions();
  }, [navigate]);

  if (accessDenied) {
    return (
      <div className="access-denied">
        Access restricted to mobile devices outside 10 AM to 1 PM
      </div>
    );
  }

  return (
    <ColorSwitcher>
      <Routes>
        <Route path='/' element={<Home slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/Askquestion' element={<Askquestion />} />
        <Route path='/email-otp-form' element={<EmailOtpForm slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/verify-email-otp' element={<VerifyOtpForm slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/Auth' element={<Auth />} />
        <Route path='/Question' element={<Question slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/Question/:id' element={<Displayquestion slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/Tags' element={<Tags slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/Users' element={<Users slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/Users/:id' element={<Userprofile slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/choose' element={<ChooseOption slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/password-reset' element={<PasswordReset slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/forgotpassword/:id/:token' element={<ForgotPassword slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/send-otp' element={<SendOTP slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/verify-otp' element={<VerifyOTP slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/sending-otp' element={<SendOtpPage slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/verifying-otp' element={<VerifyOtpPage slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/user-Info' element={<UserInfo slidein={slidein} handleslidein={handleslidein} />} />
      </Routes>
    </ColorSwitcher>
  );
}

export default Allroutes;
