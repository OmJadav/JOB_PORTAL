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
function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/post/application/:jobId' element={<PostApplication />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <ToastContainer position="bottom-right" theme="dark" />
      </BrowserRouter>
    </>
  );
}

export default App;
