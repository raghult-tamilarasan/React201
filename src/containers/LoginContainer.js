import React, { Component } from 'react';
import LoginComponent from '../components/LoginComponent'
import { getLoginDetails } from '../api/GetLoginDetails';
import '../css/Login.css'


export default class LoginContainer extends Component {

    state = {
        userName: '',
        passWord: '',
        loginDetails: [],
        loginState: false,
        alertPopUp: false
    }
    handlePopUp = (value) => {
        this.setState({ alertPopUp: value })
    }
    handleUser = (userName, passWord) => {
        console.log(userName, passWord);
        this.state.loginDetails.map(data => {
            if (userName === data.email && passWord === data.password) {
                console.log("////////")
                localStorage.setItem('token', data.type);
                this.setState({ loginState: true })
            }
        })
        if (!this.state.loginState) {
            this.setState({ alertPopUp: true })
            console.log("User  Not Found")
        }
    }

    render() {
        return (
            <div className='login-body'><LoginComponent handleUser={this.handleUser} handleLoggedIn={this.props.handleLoggedIn}
                alertPopUp={this.state.alertPopUp} handlePopUp={this.handlePopUp} />
            </div>)
    }

    async componentDidMount() {
        const data = await getLoginDetails();
        this.setState({ loginDetails: data })
    }

}