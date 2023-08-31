
import './App.css';
import Login from './pages/Header/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListCourses from './pages/HomePage/ListCourses/ListCourses';
import AddCourses from './pages/HomePage/AddCourses/AddCourses';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/courses' element={<ListCourses/>} ></Route>
        <Route path='/courses/add-courses' element={<AddCourses/>} ></Route>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
