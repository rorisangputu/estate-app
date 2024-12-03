import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home'
import SignIn from './pages/SignIn';
import SignOut from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignOut />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
