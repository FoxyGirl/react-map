import React from 'react';
import jump from 'jump.js';

import Header from '../Header';
import Card from '../Card';
import GoogleMap from '../GoogleMap';
import '../../scss/app.scss';

import data from '../../js/data/Data';
import { easeInOutCubic } from '../../js/utils/Easing';
// import './App.scss'

const initialFilterVal = 'any';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: data.properties,
      filteredProperties: [],
      activeProperty: data.properties[0],
      isFilterVisible: false,
      filterBedrooms: initialFilterVal,
      filterBathrooms: initialFilterVal,
      filterCars: initialFilterVal,
      isFiltering: false,
    };
  }

  toggleFilter = e => {
    e.preventDefault();
    this.setState(state => ({
      isFilterVisible: !state.isFilterVisible,
    }));
  };

  filterProperties = () => {
    const {
      properties,
      filterBedrooms,
      filterBathrooms,
      filterCars,
    } = this.state;
    const isFiltering =
      filterBedrooms !== initialFilterVal ||
      filterBathrooms !== initialFilterVal ||
      filterCars !== initialFilterVal;

    const filteredProperties = !isFiltering
      ? properties
      : properties.filter(
          ({ bedrooms, bathrooms, carSpaces }) =>
            (filterBedrooms === initialFilterVal ||
              bedrooms === parseInt(filterBedrooms)) &&
            (filterBathrooms === initialFilterVal ||
              bathrooms === parseInt(filterBathrooms)) &&
            (filterCars === initialFilterVal ||
              carSpaces === parseInt(filterCars)),
        );

    this.setState({
      filteredProperties,
      isFiltering,
      activeProperty: filteredProperties[0],
    });
  };

  handleFilterChange = e => {
    const { target } = e;
    const { value, name } = target;

    this.setState({ [name]: value }, () => {
      this.filterProperties();
    });
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
      filteredProperties,
      activeProperty,
      isFilterVisible,
      isFiltering,
    } = this.state;

    const propertiesList = isFiltering
      ? filteredProperties
      : properties;

    return (
      <div>
        {/* listings - Start */}
        <div className="listings">
          <Header
            isFilterVisible={isFilterVisible}
            toggleFilter={this.toggleFilter}
            handleFilterChange={this.handleFilterChange}
          />

          <div className="cards container">
            <div className="cards-list row ">
              {propertiesList.map(property => (
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
          properties={propertiesList}
          // properties={properties}
          activeProperty={activeProperty}
          setActiveProperty={this.setActiveProperty}
        />
      </div>
    );
  }
}

export default App;
