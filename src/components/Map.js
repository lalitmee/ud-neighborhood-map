import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import PlaceMarker from './PlaceMarker';

const Map = withScriptjs(
  withGoogleMap(props => {
    const mapCenter = props.mapCenter;
    const zoom = props.zoom;
    const markers = props.places.map(place => (
      <PlaceMarker
        key={place.id}
        visible={place.visible}
        place={place}
        infoWindow={props.infoWindow}
        showInfoWindow={props.showInfoWindow}
        closeInfowWindow={props.closeInfowWindow}
        img={props.imgs}
        imgsUser={props.imgsUser}
        imagesLink={props.imagesLink}
        errMsg={props.errMsg}
      />
    ));

    return (
      <GoogleMap zoom={zoom} center={mapCenter}>
        {markers}
      </GoogleMap>
    );
  })
);

export default Map;
