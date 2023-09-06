
import './App.css';
import Login from './pages/Header/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListCourses from './pages/HomePage/ListCourses/ListCourses';
import AddCourses from './pages/HomePage/AddCourses/AddCourses';
import ListUser from './pages/HomePage/ListUser/ListUser';
import AddUser from './pages/HomePage/AddCourses/AddUser';
import PageSearch from './pages/Search/PageSearchUser';
import PageSearchUser from './pages/Search/PageSearchUser';
import NotPoundPage from './pages/NotFoundPage/NotPoundPage';
import SigUp from './pages/Header/SigUp/SigUp';
import Spinner from './pages/Spinner/Spinner';

function App() {
  return (
    <div>
      <Spinner></Spinner>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/courses' element={<ListCourses/>} ></Route>
        <Route path='/courses/add-courses' element={<AddCourses/>} ></Route>
        <Route path='/user' element={<ListUser/>} ></Route>
        {/* <Route path='/user/:id' element={<ListUser/>} ></Route> */}
        <Route path='/user/add-user' element={<AddUser/>} ></Route>
        <Route path='search-user' element={<PageSearchUser/>} ></Route>
        <Route path='*' element={<NotPoundPage/>} ></Route>
        <Route path='register' element={<SigUp/>} ></Route>




      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
