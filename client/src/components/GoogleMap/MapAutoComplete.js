/**
 * This file enables the autocomplete feature for inputting an address into the Google Maps API.
 * @author Neha Sujith
 */
import React, { Component } from 'react';
import { AutoComplete } from 'antd';

class MapAutoComplete extends Component {
  /**
   * Constructs the MapAutoComplete feature as an extension of the Component class
   * @param {*} props The parameters as given in the parent Component class
   */
  constructor(props) {
    super(props);
    this.state = {
      suggestionts: [],
      dataSource: [],
      cstatLatLng: this.props.cstatLatLng,
      autoCompleteService: this.props.autoCompleteService,
      geoCoderService: this.props.geoCoderService,
    }
  }

  /**
   * Geocode the location selected to be created as a marker
   * @param {*} value the location selected
   */
  onSelect = ((value) => {
    this.state.geoCoderService.geocode({ address: value }, ((response) => {
      const { location } = response[0].geometry;
      this.props.addMarker(location.lat(), location.lng(), this.props.markerName);
    }))
  });


  /** 
   * Runs a search on the current value as the user types in the AutoComplete field.
   * @param {*} value the address as the user is inputted it into the search field
   */
  handleSearch = ((value) => {
    const { autoCompleteService, cstatLatLng } = this.state;
    // Search only if there is a string
    if (value.length > 0) {
      const searchQuery = {
        input: value,
        location: cstatLatLng, // Search in College Station
        radius: 30000,
      };
      autoCompleteService.getQueryPredictions(searchQuery, ((response) => {
        // The name of each GoogleMaps suggestion object is in the "description" field
        if (response) {
          const dataSource = response.map((resp) => resp.description);
          this.setState({ dataSource, suggestions: response });
        }
      }));
    }
  });

  /**
   * Displays the AutoComplete component in the webapp
   * @returns the AutoComplete component calling the methods described above. Displays as a text entry field with a placeholder.
   */
  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        className="w-100"
        dataSource={dataSource}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="Enter your local address ..."
        status="error"
      />
    );
  }
}

export default MapAutoComplete;