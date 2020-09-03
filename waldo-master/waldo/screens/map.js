import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';
// import Toast from 'react-native-simple-toast';
// import mapViewdirections

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as geolib from 'geolib';

import BikeFound from './bikeFound';

const closeRadius = 10;

export default class MapScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    region: null,
    markers: null,
    isWithinRadius: null,
    isFarFromBike: null,
  };

  myBikeLocation = async () => {
    // Fetching bikeLocation
    try {
      const value = await AsyncStorage.getItem("bikeLocation");
      if (value !== null) {
        this.setState({
          bikeLocation: JSON.parse(value), // Transforming the local data into a useable objekt
        });
        return true;
      }
      else {
        this.setState({
          bikeLocation: null,
        });
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  async componentDidMount() {
    const hasBikeLocation = await this.myBikeLocation();

    await this.AskPermission(); // Check that we have permission to access location data - ask if we don't 
    this.watchId = await Location.watchPositionAsync(
      { accuray: Location.Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 1, mayShowUserSettingsDialog: true },
      (currentPosition) => {
        const distance = this.state.bikeLocation === null ? 0 : geolib.getDistance(this.state.bikeLocation.coords, currentPosition.coords);

        const within = hasBikeLocation ? geolib.isPointWithinRadius(
          currentPosition.coords,
          this.state.bikeLocation.coords,
          closeRadius
        ) : null;

        const showBikeFound = hasBikeLocation && within;

        // const showToast = // show toast if
          //  !this.state.showToast // it wasn't shown in previous state
          // && this.state.showBikeFound // and we're coming from the BikeFound view
          // && !showBikeFound; // and we're showing the map again

        this.setState({
          location: currentPosition,
          region: {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          showBikeFound: showBikeFound,
          // showToast: showToast,
          marker: {
            latlng: currentPosition.coords
          },
          error: null,
        });
        console.log('map:: comparing location (geo fencing)   close=' + (within ? 'Y' : 'N') + '    dist=' + distance);
      }
    );
  }

  componentWillUnmount() {
    if (this.watchId != undefined)
      this.watchId.remove();
  }

  AskPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('Asking for geo permission: ' + status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'In order to make the app functional, permission to use the camera is required',
      });
    }
  };

  render() {

    const { showBikeFound, showToast } = this.state;

    //if (showToast) {
    //  Toast.showWithGravity("Nope, you're too far now.", Toast.LONG, Toast.TOP);
    // }

    return showBikeFound ? (
      <BikeFound navigation={this.props.navigation} />
    ) : (
        <View style={styles.container}>
          {this.state.region ?
            (<MapView showsUserLocation style={styles.mapStyle} initialRegion={this.state.region} >
              {this.state.bikeLocation ?
                (<MapView.Marker coordinate={this.state.bikeLocation.coords} title='Mybike' description='Find Waldo' >
                  <Image source={require('../assets/bikeMarker.png')} style={{ width: 45, height: 50.5 }} />
                </MapView.Marker>)
                : null}
            </MapView>)
            : null}

          {<TouchableOpacity style={styles.myPosition}> 
            <Image source={require('../assets/myPosition.png')} style={styles.imgbtn2}/>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('homescreen')}>
            <Image source={require('../assets/homebtn.png')} style={styles.imgbtn} />
          </TouchableOpacity>

        </View>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height, // * 4 / 5,
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 75,
    height: 75,
    borderRadius: 150,
    margin: 10,
    position: 'absolute',
    top: 35,
    left: 25,
    justifyContent: 'center',
  },
  myPosition: {
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: 150,
    margin: 10,
    position: 'absolute',
    bottom: 25,
    right: 25,
    justifyContent: 'center',

  },
  imgbtn: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 55,
    height: 42,
  },
  imgbtn2: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 30,
    height: 30,
  },
});