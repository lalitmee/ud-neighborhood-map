import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './App.css';
import MapContainer from './components/MapContainer';
import Sidebar from './components/Sidebar';
import places from './places.js';

class App extends Component {
  state = {
    errMsg: '',
    selectedImg: '',
    infoWindow: '',
    mapCenter: { lat: 26.218287, lng: 78.182831 },
    zoom: 6,
    imgs: [],
    imgsUser: [],
    imagesLink: [],
    hasError: false,
    places
  };

  /**
   * For showing the info of the places
   */
  showInfoWindow = place => {
    this.setState({
      infoWindow: place.id,
      selectedImg: place.name
    });
  };

  /**
   * for closing the info of the places
   */
  closeInfowWindow = () => {
    this.setState({
      infoWindow: '',
      selectedImg: null
    });
  };

  /**
   * Filtering markers according to the input which user will enter in the
   * search box
   */
  filterMarkers = showingPlaces => {
    let updatedPlaces = JSON.parse(JSON.stringify(this.state.places));
    updatedPlaces.forEach(place => {
      if (showingPlaces.find(pl => pl.id === place.id)) place['visible'] = true;
      else place['visible'] = false;
    });
    this.setState({ places: updatedPlaces });
  };

  /**
   * Fethich Images from Unsplash API
   */
  componentDidUpdate = () => {
    this.fetchData();
  };

  fetchData = () => {
    const searchedForText = this.state.selectedImg;
    const unsplashKey =
      '461e85d44d4c08f58f37c36959d0207a4753c976252ab45d4c6bcac355d473cf';

    fetch(
      `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${searchedForText}`,
      {
        headers: { Authorization: 'Client-ID ' + unsplashKey }
      }
    )
      .then(res => res.json())
      .then(this.addImage)
      .catch(this.errText);
  };

  addImage = data => {
    this.setState({
      imgs: data.results[0].urls,
      imgsUser: data.results[0].user,
      imagesLink: data.results[0].user.links.html
    });
  };

  errText = err => {
    console.log('The error is : ', err);
  };

  componentDidCatch(error) {
    this.setState({ hasError: true });
  }

  render() {
    let style = {
      bmCrossButton: {
        height: '24px',
        width: '24px',
        right: '40px',
        padding: '10px'
      }
    };
    return (
      <div className="App">
        {!this.state.hasError && (
          <MapContainer
            zoom={this.state.zoom}
            mapCenter={this.state.mapCenter}
            places={this.state.places}
            infoWindow={this.state.infoWindow}
            showInfoWindow={this.showInfoWindow}
            closeInfowWindow={this.closeInfowWindow}
            imgs={this.state.imgs}
            imgsUser={this.state.imgsUser}
            imagesLink={this.state.imagesLink}
            errMsg={this.state.errMsg}
          />
        )}
        {this.state.hasError && <h2>Oops, something went wrong!</h2>}

        <Menu styles={style}>
          <Sidebar
            places={this.state.places}
            filterMarkers={this.filterMarkers}
            showInfoWindow={this.showInfoWindow}
          />
        </Menu>
      </div>
    );
  }
}

export default App;
