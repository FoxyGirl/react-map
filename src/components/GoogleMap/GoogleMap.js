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
    const { setActiveProperty, activeProperty } = this.props;
    const { index: activeIndex } = activeProperty;
    const { markers } = this.state;

    properties.forEach(property => {
      const {
        latitude: lat,
        longitude: lng,
        index,
        address,
      } = property;

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

      const infoWindow = new google.maps.InfoWindow({
        content: `<h1>${address}</h1>`,
      });

      this.marker.iw = infoWindow;

      this.marker.addListener('click', () => {
        markers.forEach(marker => {
          marker.iw.close();
        });

        setActiveProperty(property, true);
      });

      markers.push(this.marker);
    });

    markers[activeIndex].iw.open(this.map, markers[activeIndex]);
    this.setState({
      markers,
    });
  };

  componentDidUpdate(nextProps) {
    const { index: prevIndex } = nextProps.activeProperty;
    const { index: activeIndex } = this.props.activeProperty;

    if (prevIndex !== activeIndex) {
      const { markers } = this.state;

      markers.forEach(marker => {
        marker.iw.close();
      });

      markers[activeIndex].iw.open(this.map, markers[activeIndex]);
    }
  }

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
  activeProperty: PropTypes.object.isRequired,
  setActiveProperty: PropTypes.func.isRequired,
};

export default GoogleMap;
