import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapAutoComplete from '../../components/GoogleMap/MapAutoComplete';
import MapMarker from '../../components/GoogleMap/MapMarker';
import PlaceCard from '../../components/GoogleMap/PlaceCard';
import ConstraintSlider from '../../components/GoogleMap/ConstraintSlider';

const CSTAT = { lat: 30.622370, lng: -96.325851 };

class MapsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      constraints: [{ name: '', distance: 0 }],
      searchResults: [],
      mapsLoaded: false,
      markers: [],
      map: {},
      mapsApi: {},
      cstatLatLng: {},
      autoCompleteService: {},
      placesService: {},
      geoCoderService: {},
      directionService: {},
    };
  }

  // Update name for constraint with index === key
  updateConstraintName = ((event, key) => {
    event.preventDefault();
    const prevConstraints = this.state.constraints;
    const constraints = Object.assign([], prevConstraints);
    constraints[key].name = event.target.value;
    this.setState({ constraints });
  });

  // Updates distance (in KM) for constraint with index == key
  updateConstraintTime = ((key, value) => {
    const prevConstraints = this.state.constraints;
    const constraints = Object.assign([], prevConstraints);
    constraints[key].distance = value;
    this.setState({ constraints });
  });

  // Adds a Marker to the GoogleMaps component
  addMarker = ((lat, lng, name) => {
    const prevMarkers = this.state.markers;
    const markers = Object.assign([], prevMarkers);

    // If name already exists in marker list, just replace lat & lng.
    let newMarker = true;
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].name === name) {
        newMarker = false;
        markers[i].lat = lat;
        markers[i].lng = lng;
        break;
      }
    }
    // Name does not exist in marker list. Create new marker
    if (newMarker) {
      markers.push({ lat, lng, name });
    }

    this.setState({ markers });
  });

  // Runs once when the Google Maps library is ready
  // Initializes all services that we need
  apiHasLoaded = ((map, mapsApi) => {
    this.setState({
      mapsLoaded: true,
      map,
      mapsApi,
      cstatLatLng: new mapsApi.LatLng(CSTAT.lat, CSTAT.lng),
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      placesService: new mapsApi.places.PlacesService(map),
      geoCoderService: new mapsApi.Geocoder(),
      directionService: new mapsApi.DirectionsService(),
    });
  });

  handleSearch = (() => {
    const { markers, constraints, placesService, directionService, mapsApi } = this.state;
    if (markers.length === 0) {
      return;
    }
    const filteredResults = [];
    const marker = markers[0];
    const distanceLimit = constraints[0].distance;
    const markerLatLng = new mapsApi.LatLng(marker.lat, marker.lng);

    const placesRequest = {
      location: markerLatLng,
      type: ['restaurant', 'cafe'],
      query: 'Chick-fil-A',
      rankBy: mapsApi.places.RankBy.DISTANCE,
    };

    // First, search for chick-fil-a locations.
    placesService.textSearch(placesRequest, ((response) => {
      const responseLimit = Math.min(10, response.length);
      console.log(response)
      for (let i = 0; i < responseLimit; i++) {
        const cfa = response[i];
        const { name } = cfa;
        const address = cfa.formatted_address;
        let photoUrl = '';
        let openNow = false;
        if (cfa.opening_hours) {
          openNow = cfa.opening_hours.open_now;
        }
        if (cfa.photos && cfa.photos.length > 0) {
          photoUrl = cfa.photos[0].getUrl();
        }

        const directionRequest = {
          origin: markerLatLng,
          destination: address,
          travelMode: 'DRIVING',
        }
        directionService.route(directionRequest, ((result, status) => {
          if (status !== 'OK') { return }
          const travellingRoute = result.routes[0].legs[0];
          console.log("limit", distanceLimit)
          if (parseFloat(travellingRoute.distance.text, 10) < distanceLimit) {
            const distanceText = travellingRoute.distance.text;
            filteredResults.push({
              name,
              address,
              openNow,
              photoUrl,
              distanceText
            });
          }
          // Finally, Add results to state
          this.setState({ searchResults: filteredResults });
        }));
      }
    }));
  });

  render() {
    const { constraints, mapsLoaded, cstatLatLng, markers, searchResults } = this.state;
    const { autoCompleteService, geoCoderService } = this.state; // Google Maps Services
    return (
      <div className="w-100 d-flex py-4 flex-wrap justify-content-center">
        <h1 className="w-100" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Find a nearby Chick-fil-A location</h1>
        {/* Constraints section */}
        <section className="col-4">
          {mapsLoaded ?
            <div>
              {constraints.map((constraint, key) => {
                const { name, distance } = constraint;
                return (
                  <div key={key} className="mb-4">
                    <div className="d-flex mb-2">
                      <MapAutoComplete
                        autoCompleteService={autoCompleteService}
                        geoCoderService={geoCoderService}
                        cstatLatLng={cstatLatLng}
                        markerName={name}
                        addMarker={this.addMarker}
                      />
                    </div>
                    <br></br>
                    <ConstraintSlider
                      value={distance}
                      onChange={(value) => this.updateConstraintTime(key, value)}
                    />
                    {/* Search Button */}
                    <button className="mt-4 btn btn-outline-danger" type="primary" size="large" onClick={this.handleSearch}>Search</button>
                  </div>
                );
              })}
            </div>
            : null
          }
        </section>

        {/* Maps Section */}
        <section className="col-8 h-lg">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_API_KEY,
              libraries: ['places', 'directions']
            }}
            defaultZoom={11}
            defaultCenter={{ lat: CSTAT.lat, lng: CSTAT.lng }}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >
            {/* Pin markers on the Map*/}
            {markers.map((marker, key) => {
              const { name, lat, lng } = marker;
              return (
                <MapMarker key={key} name={name} lat={lat} lng={lng} />
              );
            })}
          </GoogleMapReact>
        </section>

        {/* Results section */}
        {searchResults.length > 0 ?
          <>
            <section className="col-12">
            <hr color="red"/>
              <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-wrap">
                  {searchResults.map((result, key) => (
                    <PlaceCard info={result} key={key} />
                  ))}
                </div>
              </div>
            </section>
          </>
          : null}
      </div>
    )
  }
}

export default MapsContainer;