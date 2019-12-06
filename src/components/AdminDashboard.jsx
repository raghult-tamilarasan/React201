import React from 'react';
import FlightListPage from './FlightListPage'
import '../css/AdminDashboard.css'

export default class AdminDashboard extends React.Component {
    render() {
        return (
                <div className="admin-body">
                    <h1> Admin Page</h1>
                    <h2> List of Flights Available </h2>
                    <FlightListPage />
                </div>
        )
    }
}