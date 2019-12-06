import React from 'react';
import '../css/StaffDashboard.css'
import FlightListPage from './FlightListPage';

export default class StaffDashboard extends React.Component {

    render() {
        return (
            <div className="body">
                <h1> Staff Page</h1>
                <h2> List of Flights Available </h2>
                <FlightListPage />
            </div>
        )
    }
}