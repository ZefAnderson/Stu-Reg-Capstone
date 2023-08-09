import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage';
import { AdminPage } from './Pages/AdminPage';
import { CoursesPage } from './Pages/CoursesPage';
import { UserCoursesPage } from './Pages/UserCoursesPage';
import { AdminCoursesPage } from './Pages/AdminCoursesPage';
import { RegistrationPage } from './Pages/RegistrationPage';
import { StudentPage } from './Pages/StudentPage';
import { UpdateUserPage } from './Pages/UpdateUserPage';
import { UserListPage } from './Pages/UserListPage';
import { RegistrationManagementPage } from './Pages/RegistrationManagementPage';
import Protected from './Protected';
import CheckAdmin from './CheckAdmin';
import ReactLoading from 'react-loading';
import React from 'react';
import './App.css'



export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const checkUserAuthentication = () => {
    const token = localStorage.getItem('token');
    return !!token;
  }

  const checkAdminCredentials = () => {
    const role = localStorage.getItem('role');
    return !!role;
  }

  useEffect(() => {
    const isAuthenticated = checkUserAuthentication(); 
    const confirmedAdmin = checkAdminCredentials();
    setIsLoggedIn(isAuthenticated);
    setIsAdmin(confirmedAdmin);
    setLoading(false);
  }, []);

  if (loading) {
    return <ReactLoading type="spin" color="#444" height={50} width={50} />;
  }

  return (
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/admin' element={
          <Protected isLoggedIn={isLoggedIn}>
            <CheckAdmin isAdmin={isAdmin}>
              <AdminPage />
            </CheckAdmin>
          </Protected>
        } />
        <Route path='/courses' element={
          <Protected isLoggedIn={isLoggedIn}>
            <CoursesPage /> 
          </Protected>
        } />
        <Route path='/usercourses' element={
          <Protected isLoggedIn={isLoggedIn}>
            <UserCoursesPage />
          </Protected>
        } />
        <Route path='/admincourses' element={
          <Protected isLoggedIn={isLoggedIn}>
            <CheckAdmin isAdmin={isAdmin}>
              <AdminCoursesPage />
            </CheckAdmin>
          </Protected>
        } />
        <Route path='/registrationmanagement' element={
          <Protected isLoggedIn={isLoggedIn}>
            <CheckAdmin isAdmin={isAdmin}>
              <RegistrationManagementPage />
            </CheckAdmin>
          </Protected>
        } />

        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/student' element={
          <Protected isLoggedIn={isLoggedIn}>
              <StudentPage />
          </Protected>
        } />
        <Route path='/updateuser' element={
          <Protected isLoggedIn={isLoggedIn}>
            <UpdateUserPage />
          </Protected>
        } />
        <Route path='/userlist' element={
          <Protected isLoggedIn={isLoggedIn}>
            <CheckAdmin isAdmin={isAdmin}>
              <UserListPage />
            </CheckAdmin>
          </Protected>
        } />
      </Routes>
  );
};
