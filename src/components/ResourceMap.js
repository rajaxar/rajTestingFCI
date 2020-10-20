import React, { Component, createRef, Ref } from 'react'
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import { Map, TileLayer, Marker, Popup, ZoomControl, Tooltip } from 'react-leaflet'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Icon } from "leaflet";
import axios from 'axios';
import InfoModal from './InfoModal'
import Media from 'react-media';
const resources = require('../resources.js');



export default class ResourceMap extends Component {
  state = {
    lat: 28.5,
    lng: -86,
    zoom: 7,
    activePin: null,
    detailsActive: false
  }

  constructor(props) {
    super(props);
    this.mapRef = createRef();
    this.markerRefs = {};
  }

  async componentDidMount() {
    
  }

  async locateUser() {
    const mr = this.mapRef.current;
    mr.leafletElement.locate()
  }

  handleLocationFound = (e) => {
    this.setState({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      zoom: 11
    })
  }

  getMarkerRef = (name) => {
    if (!(name in this.markerRefs)) {
      this.markerRefs[name] = createRef()
    }
    return this.markerRefs[name]
  }

  setActivePin = (r) => {
    this.setState({
      activePin: r
    })
  }

  showDetail = (e) => {
    this.setState({
      detailsActive: true
    })
  }

  hideDetail = () => {
    this.setState({
      detailsActive: false,
      activePin:null
    })
  }

  getMarkerName = (pin) => {
    for (var i=0; i<pin['tags'].length; i++) {
      
      if (pin['tags'][i] in resources.i) {
        return pin['tags'][i]
      }
    }
    return "Other"
  }

  render() {
    if (this.props.locationPermissionGranted) {
      this.locateUser();
    }
    var mql = window.matchMedia("(min-width: 768px)").matches;
    //alert(this.state.resourceVisibilityLevels.toString())
    return [
      (this.state.activePin && this.state.detailsActive) ?
        <InfoModal
          show={true}
          onHide={this.hideDetail.bind(this)}
          heading={this.state.activePin.name}
          content={
            <div>
              <div className="row">
                <div className="col">{this.state.activePin.address}</div>
                <div className="col directionsLink">
                  <a
                    className="btn btn-info"
                    href={'https://www.google.com/maps/dir/?api=1&destination='+encodeURI(this.state.activePin.address)}
                    target="_blank"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              <p>
                <a
                  href={"http://"+this.state.activePin.website}
                  target="_blank"
                >
                  {this.state.activePin.website}
                </a>
              </p>
              {
                this.state.activePin.tags.includes("COVID Testing") ?
                  <div>
                    {this.state.activePin.dates ?
                      <p>Dates Operating: {this.state.activePin.dates}</p>
                      :
                      ''
                    }
                    {this.state.activePin.cost ?
                      <p>Test Cost: {this.state.activePin.cost}</p>
                      :
                      ''
                    }
                    {this.state.activePin.test_type ?
                      <p>Test Type(s) Available: {this.state.activePin.test_type}</p>
                      :
                      ''
                    }
                      {this.state.activePin.drive_through == 'Yes' ?
                      <p><b>This site offers drive-through testing</b></p>
                      :
                      ''
                    }
                  </div>
                  :
                  ''
              }
              <p>{this.state.activePin.hours}</p>
              <p>{this.state.activePin.description}</p>
              {
                this.state.activePin.source.includes('UWNWFL') ?
                  <p style={{'font-size':'small'}}><i className='material-icons' style={{'color':'blue'}}>check</i><i>This resource verified by the United Way of NW FL.</i></p>
                  :
                  ''
              }
            </div>
          }
        />
      :
      '',
      this.props.pins ?
        <Map
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          className='resourceMap'
          ref={this.mapRef}
          onLocationfound={this.handleLocationFound}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomleft" />
          
          {this.props.pins.map(r => {
              return <Marker
                key={r.name+"_Marker"}
                ref={this.getMarkerRef(r['name'])}
                position={[
                  r.lat,
                  r.long
                ]}
                icon={divIcon(resources.i[this.getMarkerName(r)])}
                //{divIcon({
                //  html:renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x" />)
                //})}
                onClick={() => {
                  this.setActivePin(r)
                  this.showDetail()
                }}
              >
                  {
                    mql ?
                      <Tooltip>{r.name}</Tooltip>
                    :
                      ''
                  }
              </Marker>;
            })}
          

        </Map>
        :
        'Loading...'
    ]
  }
}