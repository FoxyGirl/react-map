import React from 'react';
import jump from 'jump.js';

import Header from '../Header';
import Card from '../Card';
import GoogleMap from '../GoogleMap';
import '../../scss/app.scss';

import data from '../../js/data/Data';
import { easeInOutCubic } from '../../js/utils/Easing';
// import './App.scss'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: data.properties,
      activeProperty: data.properties[0],
      isFilterVisible: false,
    };
  }

  toggleFilter = e => {
    e.preventDefault();
    this.setState(state => ({
      isFilterVisible: !state.isFilterVisible,
    }));
  };

  setActiveProperty = (property, scroll) => {
    this.setState({
      activeProperty: property,
    });

    if (scroll) {
      const target = `#card-${property.index}`;
      jump(target, {
        duration: 800,
        easing: easeInOutCubic,
      });
    }
  };

  render() {
    const {
      properties,
      activeProperty,
      isFilterVisible,
    } = this.state;

    return (
      <div>
        {/* listings - Start */}
        <div className="listings">
          <Header
            isFilterVisible={isFilterVisible}
            toggleFilter={this.toggleFilter}
          />

          <div className="cards container">
            <div className="cards-list row ">
              {properties.map(property => (
                <Card
                  key={property._id}
                  property={property}
                  activeProperty={activeProperty}
                  setActiveProperty={this.setActiveProperty}
                />
              ))}
            </div>
          </div>
        </div>
        {/* listings - End */}

        <GoogleMap
          properties={properties}
          activeProperty={activeProperty}
          setActiveProperty={this.setActiveProperty}
        />
      </div>
    );
  }
}

export default App;
