import { useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/constants';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/common/Navbar';
import VerifyEmail from './components/core/auth/VerifyEmail';
import ForgotPassword from './components/core/auth/ForgotPassword';
import ResetPassword from './components/core/auth/UpdatePassword';
import UpdatePassword from './components/core/auth/UpdatePassword';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './pages/Dashboard';
import Cart from './components/core/Dashboard/Cart';
import EnrolledCourse from './components/core/Dashboard/EnrolledCourse';
import PurchasedHistory from './components/core/Dashboard/PurchasedHistory';
import PrivateRoute from './components/core/auth/PrivateRoute';
import Settings from './components/core/Dashboard/Settings';
import AddCourse from './components/core/Dashboard/AddCourses/AddCourses';
import MyCourses from './components/core/Dashboard/MyCourses/MyCourses'
function App() {
  const [isLogedIn,setIsLogedIn]=useState(false);
  const {user}=useSelector((state)=>(state.profile));
  console.log("User in App.jsx", user);
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />} />
        <Route path="/signup" element={<SignupPage isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />} />
        <Route path="/verify-email" element={<VerifyEmail></VerifyEmail>} />
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} />
        <Route path="/reset-password" element={<ResetPassword></ResetPassword>} />
        <Route path="/update-password/:token" element={<UpdatePassword></UpdatePassword>} />
        <Route path="/about" element={<AboutPage></AboutPage>} />
        <Route path="/contact" element={<ContactPage></ContactPage>} />
        <Route element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>
        {/* Common routes for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

        {/* Routes only for students */}
        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
            <Route path="dashboard/cart" element={<Cart />} />
            <Route path="dashboard/enrolled-courses" element={<EnrolledCourse />} />
            <Route path="dashboard/purchase-history" element={<PurchasedHistory />} />
          </>
        )}

        {/* Routes only for instructors */}
        {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
            <Route path="dashboard/add-course" element={<AddCourse />} />
            <Route path="dashboard/my-courses" element={<MyCourses />} />
            {/* <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            <Route path="dashboard/instructor" element={<InstructorDashboard />} /> */}
          </>
        )}

        {/* Routes only for admin */}
        {/* {user?.accountType === ACCOUNT_TYPE.ADMIN && (
          <>
            <Route path="dashboard/admin-panel" element={<AdminPannel />} />
          </>
        )} */}

        </Route>

      </Routes>
    </div>
  );
}

export default App;