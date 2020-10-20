import React, { Component, createRef, Ref } from 'react';
import {Container, Navbar, Nav, Form, Button, FormControl, Modal} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Row, Col, Collapse } from 'react-bootstrap';

export default class WelcomeOverlay extends Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        return (
            <Col className="d-flex col-sm-5 col-xs-12 m-0 p-0 mt-5">
                <Card className="welcomeCard align-self-center">

                    <div className="card-header d-flex justify-content-end p-2 pt-4 m-0">
                        <Col className="col-10">
                            <h4>Welcome to the Florida Community Resource Map!</h4>
                        </Col>
                        <Col>
                            <button type="button" class="close" aria-label="Close" onClick={()=>{this.props.setWelcomeActive(false)}}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Col>
                    </div>
                    
                    <div className="card-body">
                        <p>This map has been built and crowdsourced by volunteers to help you find the services you need in Florida.</p>
                        <p>There are many categories of services represented, from <a href="#" onClick={() => this.props.filterByTag("COVID Testing", true)}>COVID-19 tests</a> to <a href="#" onClick={() => this.props.filterByTag("Food and Nutrition", true)}>food resources</a>.</p>
                        <p>Would you be willing to securely share your location with our service to easily view resources close to you?</p>
                        <Button onClick={this.props.locateUser}>Share Location and Get Started</Button>
                    </div>

                </Card>
            </Col>
        )
    }
}