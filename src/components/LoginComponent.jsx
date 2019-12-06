import React from 'react';
import { Button, Form } from 'react-bootstrap';
import '../css/Login.css';
import { Redirect } from "react-router-dom";
import { } from '../containers/LoginContainer'
import Alert from 'react-bootstrap/Alert'

export default class Login extends React.Component {

    state = {
        userName: '',
        passWord: '',
    }

    handleSubmit = event => {
        event.preventDefault();
        const { userName, passWord } = this.state;
        this.props.handleUser(userName, passWord)
    }

    render() {
        const { userName, passWord } = this.state
        if (localStorage.getItem('token') === 'admin') {
            this.props.handleLoggedIn(true)
            return <Redirect to="/adminDashboard" />
        }
        else if (localStorage.getItem('token') === 'airlineStaff') {
            this.props.handleLoggedIn(true)
            return <Redirect to="/staffDashboard" />
        }
        return (
        <>
            <Alert className="alertPop" show={this.props.alertPopUp} variant="danger">
                <Alert.Heading>Check the UserName and Password</Alert.Heading>
                <p>
                    The user name or password u have entered might be incorrect.
                    <Button onClick={() => {this.props.handlePopUp(false)}} variant="outline-success">
                        Close me ya'll!
                    </Button>
                </p>
                <hr />
            </Alert>

            <div className="form-body">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="text-Name">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            value={userName}
                            onChange={event => this.setState({ userName: event.target.value })} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="text-Name">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            value={passWord}
                            onChange={event => this.setState({ passWord: event.target.value })} />
                    </Form.Group>
                    <Form.Check type="switch" id="custom-switch" label="Remember Me" />
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
            </div>
        </>
        )
    }

}