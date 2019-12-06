import React from 'react';
import { Table } from 'react-bootstrap';
import '../css/FlightListPage.css';
import { Link } from 'react-router-dom';
import { getAllFlightDetails } from '../api/GetFlightDetails';

export default class FlightListPage extends React.Component {

    state = {
        flightDetails: []
    }
    render() {
        const { flightDetails } = this.state;
        return (
            <Table striped bordered hover responsive size="m" variant="light" >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Flight Number</th>
                        <th>Airline</th>
                        <th>Departure Station</th>
                        <th>More Details</th>
                    </tr>
                </thead>
                {flightDetails.map(flight => (
                    <tbody>
                        <tr>
                            <td>{flight.id}</td>
                            <td>{flight.flightNo}</td>
                            <td>{flight.airline}</td>
                            <td>{flight.departureStation}</td>
                            <td><Link to={'/flightDetails/' + flight.id} >ShowMore</Link></td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        )
    }

    async componentDidMount() {
    const data = await getAllFlightDetails();
    this.setState({ flightDetails: data })
     }
    }   