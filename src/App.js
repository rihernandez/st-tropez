import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router , Route} from 'react-router-dom'

import Navigation from './components/Navigation';
import UserAdmin from './components/UserAdmin';
import Reservation from './components/Reservation';
import ReservationList from './components/ReservationList';
import Products from './components/Products';
import Tables from './components/Tables';
import Roles from './components/UserRole'
import Menu from './components/Menu';
import Orders from './components/Orders';
import Login from './components/Login';
import Image from './components/DisplayImage';

function App() {
  return (
    <Router>

      {/*<Navigation/>*/}
      <div className="container p-4">
      <Route path = '/' exact component={Menu}/>
      <Route path = '/users' component={UserAdmin}/>
      <Route path = '/reservation' component={Reservation}/>
      <Route path = '/reservation-list' component={ReservationList}/>
      <Route path = '/products' component={Products}/>
      <Route path = '/tables' component={Tables}/>
      <Route path = '/roles' component={Roles}/>
      <Route path = '/orders' component={Orders}/>
      <Route path = '/login' component = {Login}/>
      <Route path = '/image' component = {Image}/>
      </div>
    </Router>
  );
}

export default App;
