import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown'


export default class AdmNavigation extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
               <div className="container">
               <Link className="navbar-brand" to="/">Arboleda's Restaurant</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/product">Menú</Link>
                        </li>
                        <li className="nav-item active">
                        <Link className="nav-link" to="/register">Registrarte</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/login">Iniciar session</Link>
                        </li>
                    </ul>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Admin</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/users">Users</Dropdown.Item>
                            <Dropdown.Item href="/products">Products</Dropdown.Item>
                            <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                            <Dropdown.Item href="/order-details">Order Details</Dropdown.Item>
                            <Dropdown.Item href="/reservation">Reservations</Dropdown.Item>
                            <Dropdown.Item href="/reservation-list">Reservation Details</Dropdown.Item>
                            <Dropdown.Item href="/tables">Tables</Dropdown.Item>
                            <Dropdown.Item href="/roles">User Roles</Dropdown.Item>
                            <Dropdown.Item href="/admin">Admin</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            User</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/reservation">Reservations</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
               </div>
            </nav>
        )
    }
}
