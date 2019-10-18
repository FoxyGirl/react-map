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

  createMarkers = properties => {
    const { setActiveProperty } = this.props;

    properties.forEach(property => {
      const { latitude: lat, longitude: lng, index } = property;

      this.marker = new google.maps.Marker({
        position: { lat, lng },
        label: {
          color: '#ffffff',
          text: `${index + 1}`,
        },
        icon: {
          url:
            'https://ihatetomatoes.net/react-tutorials/google-maps/images/img_map-marker.png',
          size: new google.maps.Size(22, 55),
          origin: new google.maps.Point(0, -15),
          anchor: new google.maps.Point(11, 52),
        },
        map: this.map,
      });

      this.marker.addListener('click', () => {
        setActiveProperty(property);
      });
    });
  };

  componentDidMount() {
    const {
      properties,
      activeProperty: { latitude: lat, longitude: lng },
    } = this.props;

    this.map = new google.maps.Map(this.mapRef.current, {
      center: { lat, lng },
      zoom: 15,
      mapTypeControl: false,
      disableDefaultUI: true,
      landmarks: false,
    });

    this.createMarkers(properties);
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
