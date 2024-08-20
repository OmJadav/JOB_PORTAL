import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard';
import { PostApplication } from './pages/PostApplication';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { PageNotFound } from './pages/PageNotFound';
import { Jobs } from './pages/Jobs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLoggedInUser } from './store/Slices/userSlice';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUser())
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/post/application/:jobId' element={<PostApplication />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <ToastContainer position="top-right" theme="dark" />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
