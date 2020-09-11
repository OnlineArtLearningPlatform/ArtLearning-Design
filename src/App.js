import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NoMatch from './components/NoMatch';
import PrivateRoute from './components/PrivateRoute';

import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import file from './components/FileUploadButton';
import TeacherDashboard from './components/teacher/TeacherDashboard'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Registration} />
        <Route exact path='/file' component={file} />
        <PrivateRoute exact path='/teacher-dashboard' component={TeacherDashboard}></PrivateRoute>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
