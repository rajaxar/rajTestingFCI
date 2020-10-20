<Popup
    position={[
    this.state.activePin.lat,
    this.state.activePin.long
    ]}
    onClose={((r) => {
        this.setActivePin(null);
    })}
>
    <div>
    <h5>{this.state.activePin.name}</h5>
    <p>{this.state.activePin.hours}</p>
    <p>{this.state.activePin.address}</p>
    <p>
        <a
        href={"http://"+this.state.activePin.website}
        target="_blank"
        >
        {this.state.activePin.website}
        </a>
    </p>
    <div className="row">
        <div className="col"><Button onClick={this.showDetail}>Learn More</Button></div>
        <div className="col directionsLinkPopup">
        <Button
            className="btn btn-primary"
            href={'https://www.google.com/maps/dir/?api=1&destination='+encodeURI(this.state.activePin.address)}
            target="_blank"
        >
            Get Directions
        </Button>
        </div>
    </div>
    </div>
</Popup>