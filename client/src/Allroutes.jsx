import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Askquestion from './pages/Askquestion/Askquestion'
import Auth from './pages/Auth/Auth'
import Question from './pages/Question/Question'
import Displayquestion from './pages/Question/Displayquestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import Userprofile from './pages/Userprofile/Userprofile'
import PasswordReset from './Comnponent/PasswordReset/PasswordReset'
import ForgotPassword from './Comnponent/PasswordReset/ForgotPassword'
import ChooseOption from './Comnponent/PasswordReset/ChooseOption'
import SendOTP from './Comnponent/PasswordReset/PasswordWithOTP/SendOTP'
import VerifyOTP from './Comnponent/PasswordReset/PasswordWithOTP/VerifyOTP'
import SendOtpPage from './Comnponent/LanguageSwitcher/SendOTPPage'
import VerifyOtpPage from './Comnponent/LanguageSwitcher/VerifyOTPPage'
import ColorSwitcher from './Comnponent/ColorSwitcher'
import UserInfo from './Comnponent/BrowserAndOSDetection/UserInfo'
import EmailOtpForm from './Comnponent/BrowserAndOSDetection/EmailOtpForm'
import VerifyOtpForm from './Comnponent/BrowserAndOSDetection/VerifyEmailOTP'


function Allroutes({slidein,handleslidein}) {
  return (
    <ColorSwitcher>
    <Routes>
        <Route path='/' element={<Home slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Askquestion' element={<Askquestion />}/>
        <Route path='/email-otp-form' element={<EmailOtpForm slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/verify-email-otp' element={<VerifyOtpForm slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Auth' element={<Auth />}/>
        <Route path='/Question' element={<Question slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Question/:id' element={<Displayquestion slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Tags' element={<Tags slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Users' element={<Users slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Users/:id' element={<Userprofile slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/choose' element={<ChooseOption slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/password-reset' element={<PasswordReset slidein={slidein} handleslidein={handleslidein} />}/>
        <Route path='/forgotpassword/:id/:token' element={<ForgotPassword slidein={slidein} handleslidein={handleslidein} />}/>
        <Route path='/send-otp' element={<SendOTP slidein={slidein} handleslidein={handleslidein} />}/>
        <Route path='/verify-otp' element={<VerifyOTP slidein={slidein}  handleslidein={handleslidein}/>}/>
        <Route path='/sending-otp' element={<SendOtpPage slidein={slidein} handleslidein={handleslidein} />}/>
        <Route path='/verifying-otp' element={<VerifyOtpPage slidein={slidein} handleslidein={handleslidein} />} />
        <Route path='/user-Info' element={<UserInfo slidein={slidein} handleslidein={handleslidein}/>}/>
    </Routes>
    </ColorSwitcher>
  )
}

export default Allroutes