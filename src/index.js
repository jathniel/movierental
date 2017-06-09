import React from 'react';
import ReactDom from 'react-dom';
import Login from './components/LoginPage';
import Movie from './components/MoviePage';

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
}
