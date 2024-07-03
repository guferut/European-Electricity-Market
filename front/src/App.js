
import './App.css';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { EntityPages } from './pages/EntityPages';
import { EntityPage } from './pages/EntityPage';
import { AddEntityPage } from './pages/AddEntityPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { EditEntityPage } from './pages/EditEntityPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/features/auth/authSlice';
function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getMe())
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='entity' element={<EntityPages />} />
        <Route path=':id' element={<EntityPage />} />
        <Route path='new' element={<AddEntityPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path=':id/edit' element={<EditEntityPage />} />

      </Routes>

      <ToastContainer position="top-center" />

    </Layout>
  );
}

export default App;
