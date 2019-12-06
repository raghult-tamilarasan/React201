import React from 'react';
import { Table } from 'react-bootstrap';
import { getPassengerList } from '../api/GetFlightDetails';
import { updateSeat } from '../api/UpdatePassengerDetails';
import '../css/PassengerDetails.css'
import Button from '@material-ui/core/Button';
import SeatMap from './SeatMap'
import {passengerColumn } from '../config/passengerTableConstants'
import { MDBDataTable } from 'mdbreact';

export default class PassengerDetails extends React.Component {

    state = {
        passengerDetails: [],
        passengerToBeCheckedIn: '',
        checkInPopUp: false,
        changeSeatOrCheckin: ''
    }

    getSeatNo = async (seatNo) => {
        const { passengerToBeCheckedIn } = this.state
        let arrayId;
        this.state.passengerDetails.forEach(function (passenger, i) {
            if (passenger.id === passengerToBeCheckedIn) {
                arrayId = i
            }
        })
        this.state.passengerDetails[arrayId].seat_no = seatNo;
        this.state.passengerDetails[arrayId].status = 'AC';
        this.state.passengerDetails[arrayId].checkedIn = true;
        await updateSeat(this.state.passengerDetails[arrayId])
        this.toggle()
    }
    toggle = () => {
        this.setState({ checkInPopUp: !this.state.checkInPopUp })
    }

    doCheckin = (passengerId) => {
        this.setState({ passengerToBeCheckedIn: passengerId })
        this.toggle()
    }

    doOffload = async (passengerIdValue) => {
        let arrayId;
        this.state.passengerDetails.forEach(function (passenger, i) {
            if (passenger.id === passengerIdValue) {
                arrayId = i
            }
        })
        this.state.passengerDetails[arrayId].seat_no = 'NA';
        this.state.passengerDetails[arrayId].status = 'NC';
        this.state.passengerDetails[arrayId].checkedIn = false;
        await updateSeat(this.state.passengerDetails[arrayId])
        this.setState({ passengerToBeCheckedIn: '' })
    }

    render() {
        const { passengerDetails, checkInPopUp, changeSeatOrCheckin } = this.state

        let columns = [];
        // Table Column Names
        passengerColumn.map((passenger) => { columns.push(passenger) });
        // Populating Table Rows from Passenger Details
        const rows = passengerDetails.map((passenger) => ({
            id: passenger.id,
            first_Name: passenger.first_name,
            last_Name: passenger.last_name,
            gender: passenger.gender,
            seat_No: passenger.seat_no,
            checkin_Status: passenger.status,
            checkin: <Button variant="contained" color="primary" disabled={passenger.checkedIn}
                onClick={() => { this.setState({ changeSeatOrCheckin: 'Checkin' }); this.doCheckin(passenger.id) }}>Checkin</Button>,
            offload: <Button variant="contained" color="secondary" disabled={!passenger.checkedIn}
                onClick={() => this.doOffload(passenger.id)}>Offload</Button>,
            seat_Change: <Button variant="contained" color="primary" disabled={!passenger.checkedIn}
                onClick={() => { this.setState({ changeSeatOrCheckin: 'Change Seat' }); this.doCheckin(passenger.id) }}>Seat Change</Button>
        }))
        const data = {
            columns,
            rows
        }

        if (checkInPopUp) {
            //Seat Map Pop Up
            return <div className='popup'>
                <div className='popup_inner'>
                    <SeatMap getSeatNo={this.getSeatNo} flightNo={this.props.flightNo}
                        changeSeatOrCheckin={changeSeatOrCheckin} />
                </div>
            </div>
        }
        return (
            <div className = 'md-table-body'>
            <MDBDataTable
                striped
                hover
                thead={false}
                data={data}
            />
            </div>
        )
    }

    async componentDidMount() {
        const data = await getPassengerList(this.props.flightNo);
        this.setState({ passengerDetails: data })
    }
}