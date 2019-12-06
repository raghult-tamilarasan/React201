import React from 'react';
import { Button } from 'react-bootstrap';
import {  BrowserRouter ,Redirect } from "react-router-dom";
// import Modal from 'react-bootstrap/Modal';
import '../css/Logout.css'

export default class Logout extends React.Component {

    state = {
        loggedOut: false
        // smShow :''
    }

    handleLogout() {
        localStorage.removeItem('token')
        console.log("Button")
        this.setState({ loggedOut: true })
    }
    render() {
        if (this.state.loggedOut) {
            this.props.handleLoggedIn(false);
            return <BrowserRouter><Redirect to="/" /></BrowserRouter>
        }
        return (
            <>
                <div className="body">
                    <div className="button">
                        <Button onClick={this.handleLogout.bind(this)} variant="light">Logout</Button>
                    </div>
                </div>

                {/* <ButtonToolbar>
                    <Button onClick={() => this.setState({ smShow : true })}>Small modal</Button>
                    <Modal
                        size="sm"
                        show={smShow}
                        onHide={() => this.setState({ smShow : false })}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                Small Modal
    </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>...</Modal.Body>
                    </Modal>
                </ButtonToolbar> */}
            </>
        )
    }
}