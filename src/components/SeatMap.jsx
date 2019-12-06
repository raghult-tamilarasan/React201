import React from 'react';
import '../css/SeatMap.css';
import { Button } from 'react-bootstrap';
import { getPassengerList } from '../api/GetFlightDetails';

export default class Seat extends React.Component {

    state = {
        seat: [
            '1A', '2A', '3A', '4A', '5A',
            '1B', '2B', '3B', '4B', '5B',
            '1C', '2C', '3C', '4C', '5C',
            '1D', '2D', '3D', '4D', '5D',
            '1E', '2E', '3E', '4E', '5E',
            '1F', '2F', '3F', '4F', '5F',
            '1G', '2G', '3G', '4G', '5G'
        ],
        seatReserved: [],
        selectedSeat: ''
    }

    confirmSeat() {
        console.log(this.state.selectedSeat)
        this.props.getSeatNo(this.state.selectedSeat)
    }

    onClickChangeSeat(seat) {
        console.log(seat)
        this.setState({ selectedSeat: seat })
    }

    render() {
        let popUp = false
        if (this.props.seatMapPopUp !== undefined) {
            popUp = this.props.seatMapPopUp;
        }
        return (
            <div className='seatMap-body'>
                <h1>Seat Map {popUp ? <Button onClick={() => this.props.toggle()}>Close</Button> : null}</h1>
                <DrawGrid
                    seat={this.state.seat}
                    reserved={this.state.seatReserved}
                    onClickChangeSeat={this.onClickChangeSeat.bind(this)}
                    selectedSeat={this.state.selectedSeat}
                />
                {!popUp ? <Button onClick={() => { this.confirmSeat() }}>{this.props.changeSeatOrCheckin}</Button> : null}
            </div>
        )
    }

    async componentDidMount() {
        console.log("seat map" + this.props.flightNo)
        const data = await getPassengerList(this.props.flightNo);
        console.log(data);
        this.setReservedSeats(data)
    }
    setReservedSeats(passengerDeatils) {
        const seatNos = passengerDeatils.filter(passenger => passenger.seat_no !== 'NA').map((passenger, i) => {
            return passenger.seat_no;
        })
        console.log(seatNos);
        this.setState({ seatReserved: seatNos })
    }
}

class DrawGrid extends React.Component {
    render() {
        return (
            <div className="container">
                <h2></h2>
                <table className="grid">
                    <tbody>
                        <tr>
                            <div className="td-align">
                                {this.props.seat.map(row =>
                                    this.props.reserved.indexOf(row) > -1 ? <td className='na'>NA</td> :
                                        <td
                                            className={this.props.selectedSeat === row ? 'selected' : null}
                                            key={row} onClick={e => this.onClickSeat(row)}>{row}
                                        </td>
                                )}
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    onClickSeat(seat) {
        this.props.onClickChangeSeat(seat);
    }

}