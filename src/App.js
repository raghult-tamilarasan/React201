import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './components/Logout';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import SeatMap from './components/SeatMap';
import Dummy from './components/Dummy';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import FlightDetails from './components/FlightDetails';
import LoginContainer from './containers/LoginContainer';


class App extends React.Component {
        state = {
            loggedIn: false
        }
        render() {
            // return <Dummy / >
            const { loggedIn } = this.state;
            let admin = false;
            let staff = false;
            if (!loggedIn) {
                return < > { loggedIn } < Router > < Route path = "/" > < LoginContainer handleLoggedIn = { this.handleLoggedIn }
                /> < /
                Route > < /Router > < / >
            }
            if (localStorage.getItem('token') === 'admin') {
                admin = true;
            } else staff = true;
            return ( <
                >
                {
                    loggedIn ? < Logout handleLoggedIn = { this.handleLoggedIn }
                    /> : null} <
                    Router >
                    <
                    div >
                    <
                    Switch >
                    <
                    Route exact path = "/" >
                    <
                    LoginContainer handleLoggedIn = { this.handleLoggedIn }
                    /> < /
                    Route > <
                    Route path = "/staffDashboard" > { staff ? < StaffDashboard / > : null } <
                    /Route> <
                    Route path = "/adminDashboard" > { admin ? < AdminDashboard / > : null } <
                    /Route> <
                    Route path = "/flightDetails/:flightNo"
                    component = { FlightDetails }
                    /> <
                    Route path = "/flightDetails/SeatMap" >
                    <
                    SeatMap / >
                    <
                    /Route> < /
                    Switch > <
                    /div> < /
                    Router > <
                    />
                )
            }

            handleLoggedIn = (event) => {
                console.log(event)
                this.setState({ loggedIn: event })
            }

        }
        export default App;