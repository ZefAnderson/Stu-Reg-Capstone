import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage';
import { AdminPage } from './Pages/AdminPage';
import { CoursesPage } from './Pages/CoursesPage';
import { UserCoursesPage } from './Pages/UserCoursesPage';
import { RegistrationPage } from './Pages/RegistrationPage';
import { StudentPage } from './Pages/StudentPage';
import { UpdateUserPage } from './Pages/UpdateUserPage';
import { UserListPage } from './Pages/UserListPage';
import React from 'react';
import ReactLoading from 'react-loading';
import './App.css'

export default function App() {
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(true);

  return (
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='admin' element={<AdminPage />} />
        <Route path='courses' element={<CoursesPage />} />
        <Route path='usercourses' element={<UserCoursesPage />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='student' element={<StudentPage />} />
        <Route path='updateuser' element={<UpdateUserPage />} />
        <Route path='userlist' element={<UserListPage />} />
      </Routes>
  );
};
