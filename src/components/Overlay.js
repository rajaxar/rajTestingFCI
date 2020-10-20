import React, { Component, createRef, Ref } from 'react'
import {Container, Navbar, Nav, Form, Button, FormControl, Modal} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Row, Col, Collapse } from 'react-bootstrap';
import InfoModal from './InfoModal'
import WelcomeOverlay from './WelcomeOverlay.js';


function Overlay(props) {

  const [showInstructionsModal, setShowInstructionsModal] = React.useState(false);
  const [showHelpModal, setShowHelpModal] = React.useState(false);
  const [showAboutModal, setShowAboutModal] = React.useState(false);

  const [welcomeActive, setWelcomeActive] = React.useState(true);

  return (
    <Container id="overlay" className="d-flex flex-column">
      <Card className="navBar shadow-lg">
        <Navbar bg="light" expand="md">
          <Row className='expanderx d-flex align-items-center ml-0 mr-0 pl-0 pr-0'>
            <Col className='col-md-auto d-flex align-items-center ml-0 mr-0 pl-0 pr-0'>
              <div class="navbar-brand">
                <Image className="logoImg img-responsive" src="/images/FARELogo.png" />
              </div>
              <span>Florida Community Resource Map</span>
            </Col>
            <Col className='d-flex justify-content-end ml-0 mr-0 pl-0 pr-0'>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end col">
              <Navbar.Collapse id="basic-navbar-nav">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item d-flex align-items-center">
                    <a class="nav-link" onClick={() => setShowInstructionsModal(true)}>
                      <Row>
                        <Col className="col-1 d-flex align-items-center">
                          <i className='material-icons collapseIcon'>support</i>
                        </Col>
                        <Col className=" d-flex align-items-center">
                          <span>How to use the map</span>
                        </Col>
                      </Row>
                    </a>
                  </li>
                  <li class="nav-item d-flex align-items-center">
                    <a class="nav-link" onClick={() => setShowHelpModal(true)}>
                      <Row>
                        <Col className="col-1 d-flex align-items-center">
                        <i className='material-icons collapseIcon'>phone</i>
                        </Col>
                        <Col className="d-flex align-items-center">
                          <span>How to get more help</span>
                        </Col>
                      </Row>
                    </a>
                  </li>
                  <li class="nav-item d-flex align-items-center">
                    <a class="nav-link" onClick={() => setShowAboutModal(true)}>
                      <Row>
                        <Col className="col-1 d-flex align-items-center">
                          <i className='material-icons collapseIcon'>perm_identity</i>
                        </Col>
                        <Col className="d-flex align-items-center">
                          <span>More info about the map</span>
                        </Col>
                      </Row>
                    </a>
                  </li>
                  <li class="nav-item d-flex align-items-center">
                    <a class="nav-link" href="mailto:frm@floridainnovation.org">
                      <Row>
                        <Col className="col-1 d-flex align-items-center">
                          <i className='material-icons collapseIcon'>comment</i>
                        </Col>
                        <Col className="d-flex align-items-center">
                          <span>Contact us</span>
                        </Col>
                      </Row>
                    </a>
                  </li>
                </ul>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Navbar>
        
      </Card>

      {(!props.locationPermissionGranted && welcomeActive) ?
        <WelcomeOverlay
          locateUser={props.locateUser}
          filterByTag={props.filterByTag}
          setWelcomeActive={setWelcomeActive}
        />
      :
      ''}

      <InfoModal
        show={showInstructionsModal}
        onHide={() => setShowInstructionsModal(false)}
        heading="How to use the map"
        content={
          <div>

            <h4>Set your home location</h4>
            <p>When you first navigate to this site, there will be a popup in the address bar of your web browser that asks for permission to know your location. Click ‘Allow’ if you would like for the map to auto-zoom to your current location. If you choose ‘Block’, you can still use the map. It will just start on an image of all of Florida.</p>
          
            <h4>Find what you’re looking for</h4>
            <p>The Filter Resources tab in the bottom right hand side of the screen contains several categories of community resources. Click one of them to see only those resources on the map. Click “All” to show all resources on the map. </p>

            <h4>Get info about a place</h4>
            <p>To learn more about a community resource, click its icon on the map. A popup will show its address, opening hours, and website link, if available. Click “Learn More” for a description of the services offered at this organization. </p>

            <h4>Get directions to a place</h4>
            <p>If you have located a community resource you would like to visit in-person, click its icon and then “Learn More”. There will be a button on the top right that says “Get Directions”. Clicking this will bring you to a Google Map navigation page with the directions from your current location to the community resource. </p>
          
          </div>
        }
      />

      <InfoModal
        show={showHelpModal}
        onHide={() => setShowHelpModal(false)}
        heading="How to get more help"
        content={
          <div>
            <p>If you need more help, you have options!</p>

            <h4>By Phone:</h4>
            <p>Dial <b>2-1-1</b> to be connected to your local United Way team. Help is available for you 24/7 for the following:</p>
            <ul>
              <li>Food and nutrition programs</li>
              <li>Shelter options and utilities assistance</li>
              <li>Disaster relief and emergency information</li>
              <li>Services for veterans</li>
              <li>Employment and education</li>
              <li>Healthcare, vaccination and health epidemics</li>
              <li>Support groups for mental illnesses and addiction</li>
              <li>Safe, confidential path out of domestic abuse</li>
            </ul>

            <h4>Online:</h4>
            <p>Find your local United Way website <a href='https://www.uwof.org/find-your-local-united-way' target='_blank'>here.</a></p>
            <p>For unemployment assistance (including access to printable forms), please visit the Florida Department of Economic Opportunity website <a href='https://covid19.floridajobs.org/' target='_blank'>here.</a></p>
            <p>To find a state-supported COVID-19 testing site, please visit <a href='https://floridadisaster.org/covid19/testing-sites/?fbclid=IwAR0jiqxcUC6buG6UWA8PuSiNNyZSb9i6JMa4uZPDApAqYg9SaZEUWtVl354&gclid=EAIaIQobChMI3vzS5vf16gIVFrbICh34OA0uEAAYAiAAEgJguvD_BwE' target='_blank'>here.</a></p>
            <p>*This testing is free, with or without insurance. Make sure you check the site to see if you qualify and what to bring with you.*</p>
          </div>
        }
      />

      <InfoModal
        show={showAboutModal}
        onHide={() => setShowAboutModal(false)}
        heading="About the Florida Community Resource Map"
        content={
          <div>
            <p>The Florida Alliance for Response to Epidemics (FARE) is a network of concerned young professionals that was formed in 2020 to support Florida’s public health and medical experts as they protect our fellow citizens against the unprecedented threat of COVID-19.</p>
            <p>FARE has partnered with the United Way of Northwest Florida and the Central Florida Foundation to launch the Florida Community Resource Map. The Florida Community Resource map is an interactive, web-based tool that will allow users to locate key resources in their community, including but not limited to: healthcare, food and nutrition, housing, and education.</p>
            <p>The Florida Community Resource map is available on the web at <a href="http://floridaresourcemap.org">floridaresourcemap.org</a></p>
            <p>Disclaimer: This map is created from data that was crowdsourced from represented organizations or online databases. FARE cannot guarantee the accuracy of the information contained in this map. Each user of this map is responsible for determining its suitability for his or her intended use or purpose.</p>
            <p>To contact FARE you can <a href="mailto:frm@floridainnovation.org">send us email.</a></p>
          </div>
        }
      />

    </Container>
  )
}

export default Overlay;