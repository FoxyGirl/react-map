import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  formRef = React.createRef();

  render() {
    const {
      toggleFilter,
      handleFilterChange,
      clearFilters,
    } = this.props;

    return (
      <form className="filter" ref={this.formRef}>
        <div className="filterBox">
          <label htmlFor="filterBedrooms">Bedrooms</label>
          <select
            id="filterBedrooms"
            name="filterBedrooms"
            onChange={e => handleFilterChange(e)}
          >
            <option value="any">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="filterBox">
          <label htmlFor="filterBathrooms">Bathrooms</label>
          <select
            id="filterBathrooms"
            name="filterBathrooms"
            onChange={e => handleFilterChange(e)}
          >
            <option value="any">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="filterBox">
          <label htmlFor="filterCars">Car Spaces</label>
          <select
            id="filterCars"
            name="filterCars"
            onChange={e => handleFilterChange(e)}
          >
            <option value="any">Any</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="filterBox filterFrom">
          <label htmlFor="priceFrom">Min Price</label>
          <select
            id="priceFrom"
            name="priceFrom"
            onChange={e => handleFilterChange(e)}
          >
            <option value="0">Any</option>
            <option value="500000">{500000}</option>
            <option value="600000">{600000}</option>
            <option value="700000">{700000}</option>
            <option value="800000">{800000}</option>
            <option value="900000">{900000}</option>
          </select>
        </div>
        <div className="filterBox">
          <label htmlFor="priceTo">Max Price</label>
          <select
            id="priceTo"
            name="priceTo"
            onChange={e => handleFilterChange(e)}
          >
            <option value="1000001">Any</option>
            <option value="600000">{600000}</option>
            <option value="700000">{700000}</option>
            <option value="800000">{800000}</option>
            <option value="900000">{900000}</option>
            <option value="1000000">{1000000}</option>
          </select>
        </div>
        <div className="filterBox">
          <label htmlFor="filterSort">Order by</label>
          <select
            id="filterSort"
            name="filterSort"
            onChange={e => handleFilterChange(e)}
          >
            <option value="any">Default</option>
            <option value="0">Price: - Low to High</option>
            <option value="1">Price: - High to Low</option>
          </select>
        </div>
        <div className="filterBox">
          <label>&nbsp;</label>
          <button
            className="btn-clear"
            onClick={e => clearFilters(e, this.formRef.current)}
          >
            Clear
          </button>
        </div>
        <button className="btn-filter" onClick={e => toggleFilter(e)}>
          <strong>X</strong>
          <span>Close</span>
        </button>
      </form>
    );
  }
}

Filter.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default Filter;
