import { useState, useEffect } from 'react'
import {Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { AdminPage } from './Pages/AdminPage';
import { CoursesPage }  from './Pages/CoursesPage';
import { RegistrationPage } from './Pages/RegistrationPage';
import { UserProfilePage } from './Pages/UserProfilePage';
import React from 'react';
import ReactLoading from 'react-loading';
import './App.css'

export default function App() {
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(true);

  return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='admin' element={<AdminPage />} />
        <Route path='courses' element={<CoursesPage />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='userprofile' element={<UserProfilePage />} />
      </Routes>
  );
};
