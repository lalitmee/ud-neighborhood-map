import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class PlaceMarker extends Component {
  render() {
    let showInfo = this.props.visible && this.props.infoWindow === this.props.place.id

  return (
    <Marker defaultAnimation={2}
      position={this.props.place.position}
      visible={this.props.place.visible}
      onClick={() => this.props.showInfoWindow(this.props.place)}
    >
      {showInfo && (
        <InfoWindow
          key={this.props.place.id}
          onCloseClick={this.props.closeInfowWindow}
        >


         <React.Fragment>
            <h1>{this.props.place.name}</h1>
           {this.props.errMsg ? <p>{this.props.errMsg}</p> : <img className='images' src={this.props.img.small} alt={this.props.place.name} /> }
            <figcaption>Photo by <a href={this.props.imgsUserLink} target='_blank'>{this.props.imgsUser.name}</a> / <a href='https://unsplash.com/'>Unsplash</a></figcaption>
         </React.Fragment>
        </InfoWindow>
      )}
    </Marker>
    );
  }
}

export default PlaceMarker;