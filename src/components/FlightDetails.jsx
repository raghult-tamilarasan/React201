import React from 'react';
import { getFlightDetails } from '../api/GetFlightDetails';
import PassengerDetails from './PassengerDetails';
import '../css/FlightDetails.css'
import { Button } from 'react-bootstrap';
import SeatMap from './SeatMap'

export default class FlightDetails extends React.Component {
    state = {
        flightDetails: [],
        seatMapPopUp: false,
    }

    toggle = () => {
        console.log(this.state.seatMapPopUp)
        this.setState({ seatMapPopUp: !this.state.seatMapPopUp })
    }

    render() {
        let flightNo = this.props.match.params.flightNo;
        const { flightDetails, seatMapPopUp } = this.state
        if(seatMapPopUp){
            return <div className='popup'>
                    <div className='popup_inner'>
                     <SeatMap toggle = {this.toggle} seatMapPopUp = {seatMapPopUp}
                      flightNo = {flightDetails.id}/>
                    </div>
                </div>
        }
        return (
            <>
            <div className = 'flight-details-body'>
                <div>
                <Button onClick={this.toggle}>Seat Map</Button>
                </div>
                <h1> Flight Details</h1>
                <div className="col1">
                    <div>Flight Number -</div>
                    <div>Airline - </div>
                </div>
                <div className="col2">
                    <div>{flightDetails.flightNo}</div>
                    <div>{flightDetails.airline}</div>

                </div>
                <div className="col3">
                    <div>Departure Station - </div>
                    <div>Arrival Station - </div>
                </div>
                <div className="col4">
                    <div>{flightDetails.departureStation}</div>
                    <div>{flightDetails.arrivalStation} </div>
                </div>
                <div className="col5">
                    <div>Departure Date -  </div>
                    <div>Arrival Date - </div>
                </div>
                <div className="col6">
                    <div>{flightDetails.departureDate}</div>
                    <div>{flightDetails.arrivalDate}</div>
                </div>
                <div>
                    <PassengerDetails flightNo= {flightNo}/>
                </div>
                </div>
            </>
        )
    }

    async componentDidMount() {
        console.log(this.props.match.params.flightNo)
        const data = await getFlightDetails(this.props.match.params.flightNo);
        this.setState({ flightDetails: data })

        // console.log(this.props.location)
        // console.log(this.props.match.params)
    }
}