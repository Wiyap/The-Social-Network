import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from 'redux/store';
import Home from 'pages/Home';
import Navbar from 'components/Navbar'
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import MyProfile from 'pages/Profile/MyProfile';
import OtherProfile from 'pages/Profile/OtherProfile';
import PostList from 'pages/Posts/PostList';
import PrivateRoute from 'components/PrivateRoute';

const App = () => {
  return(
    <Provider store={store}>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/register"} element={<Signup />} />
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/profile' element={<MyProfile/>}/>
            <Route exact path={"/users/:userSlug"} element={<OtherProfile />} />
            <Route exact path={"/posts"} element={<PostList />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  )
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'))