import React from 'react';
import ReactDom from 'react-dom';
import Login from './components/LoginPage';
import Movie from './components/MoviePage';
import Admin from './components/AdminPage';
const local = window.location.pathname;
if(local == '/login') {
  ReactDom.render(
    <Login />,
    document.getElementById('root')
  );
} else if(local == '/movies') {
  ReactDom.render(
    <Movie />,
    document.getElementById('movie')
  );
} else if(local == '/admin') {
  ReactDom.render(
    <Admin />,
    document.getElementById('admin')
  );
}
