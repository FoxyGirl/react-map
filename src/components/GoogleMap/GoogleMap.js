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
        property,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<h1>${address}</h1>`,
      });

      this.marker.iw = infoWindow;

      this.marker.addListener('click', () => {
        this.hideAll_IW();
        setActiveProperty(property, true);
      });

      markers.push(this.marker);
    });

    this.setState({
      markers,
    });

    this.showIW(activeIndex);
  };

  showIW = index => {
    const { markers } = this.state;
    markers[index].iw.open(this.map, markers[index]);
  };

  hideAll_IW = () => {
    const { markers } = this.state;

    markers.forEach(marker => {
      marker.iw.close();
    });
  };

  componentDidUpdate(prevProps) {
    const { properties: prevProperties } = prevProps;
    const { properties } = this.props;
    const { markers } = this.state;

    const { index: prevIndex } = prevProps.activeProperty;
    const { index: activeIndex } = this.props.activeProperty;

    if (prevIndex !== activeIndex) {
      if (properties.length === 0) {
        this.hideAll_IW();
      } else {
        this.hideAll_IW();
        this.showIW(activeIndex);
      }
    }

    if (prevProperties !== properties) {
      markers.forEach(marker => {
        const { property } = marker;

        if (properties.includes(property)) {
          markers[property.index].setVisible(true);
        } else {
          markers[property.index].setVisible(false);
        }
      });
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
