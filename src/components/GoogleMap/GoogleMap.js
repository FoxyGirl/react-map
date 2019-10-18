import React from 'react';
import PropTypes from 'prop-types';

const google = window.google;

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
    };

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const {
      activeProperty: { latitude: lat, longitude: lng },
    } = this.props;

    this.map = new google.maps.Map(this.mapRef.current, {
      center: { lat, lng },
      zoom: 15,
      mapTypeControl: false,
      disableDefaultUI: true,
      landmarks: false,
    });
  }

  render() {
    return (
      <div className="mapContainer">
        <div id="map" ref={this.mapRef}></div>
      </div>
    );
  }
}

GoogleMap.propTypes = {
  properties: PropTypes.array.isRequired,
};

export default GoogleMap;
