import React from 'react';
import Map from './Map';

function MapContainer(props) {
  return (
    <Map
      zoom={props.zoom}
      mapCenter={props.mapCenter}
      places={props.places}
      infoWindow={props.infoWindow}
      showInfoWindow={props.showInfoWindow}
      closeInfowWindow={props.closeInfowWindow}
      imgs={props.imgs}
      imgsUser={props.imgsUser}
      imagesLink={props.imagesLink}
      errMsg={props.errMsg}
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCaF1dunaBCxcuIs1TAMUKkCEGajOkXivw'
      }
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={
        <div
          className=""
          role="application"
          tabIndex={0}
          style={{
            height: `100vh`,
            width: `${window.innerWidth}px`
          }}
        />
      }
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

export default MapContainer;
