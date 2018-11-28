import React, { Component } from 'react';

class Sidebar extends Component {
  state = {
    query: '',
    showingPlaces: this.props.places
  };

  updateQuery = query => {
    this.setState({ query: query.trim() }); //trim() does not allow making space

    const showingPlaces = this.props.places.filter(place => {
      const placeNorm = place.name.toLowerCase();
      const queryNorm = query.toLowerCase();

      return placeNorm.indexOf(queryNorm) >= 0;
    });
    this.setState({ showingPlaces });
    this.props.filterMarkers(showingPlaces);
  };

  render() {
    return (
      <section>
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              role="search"
              title="Search for a Place"
              arial-label="Filter place by name"
              input={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
            <span />
          </div>
        </div>

        <ul className="list">
          {this.state.showingPlaces.map(place => (
            <li
              className="list-item"
              tabIndex={0}
              role="button"
              key={place.id}
              onClick={() => this.props.showInfoWindow(place)}
              onKeyPress={() => this.props.showInfoWindow(place)}
            >
              {place.name}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default Sidebar;
