import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import {Platform} from 'react-native';
import {AsyncStorage} from 'react-native';
import * as Location from 'expo-location';


<FontAwesome
  name="camera"
  style={{ color: "#fff", fontSize: 40}}
/>

export default class CameraScreen extends React.Component {
  
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
      Location: null,
      errorMessage: null,
      region: null,
      markers: null
    };


  async componentDidMount() {
    this.getPermissionAsync()
  }  
  getPermissionAsync = async () => {
      // Camera roll Permission 
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted' });
    }

    getBikeLocation = async () => {
      await this.AskPermission();
      let bikeLocation = await Location.getCurrentPositionAsync();
              this.setState({
                Location: bikeLocation,
                region: {
                  latitude: bikeLocation.coords.latitude,
                  longitude: bikeLocation.coords.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                },
                marker: {
                  latlng: bikeLocation.coords
                },
            }
              );
              await this._saveLocation();
              console.log(bikeLocation);
            };

        _saveLocation = async () => {
          await AsyncStorage.setItem("bikeLocation", JSON.stringify(this.state.Location));
          console.log(this.state.Location)
        };

    takePicture = async () => {
      try {
        const imageData = await this.camera.takePictureAsync({
          fixOrientation: true
        });
        this.setState({
          imageUri: imageData.uri
        });
        await this._saveImageAsync();
      } catch (err) {
        console.log("err: ", err);
      }
    };
  
    _saveImageAsync = async () => {
      await AsyncStorage.setItem("imageUri", this.state.imageUri);
      this.props.navigation.navigate('showimage');
      console.log(this.state.imageUri)
    };

    AskPermission = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      console.log('Asking for geo permission: ' + status);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
    };

  render() {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
           
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between"}}>
            <Camera   ref={ref => {this.camera = ref}} 
                      style={{ flex: 1 }} type={this.state.cameraType}>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  bottom: 50
                }}
                onPress= {() => { this.takePicture(); this.getBikeLocation();}}>
                  
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('homescreen')}>
             <Image source={require('../assets/homebtn.png')} style={styles.imgbtn} />
           </TouchableOpacity>
            </Camera>
        </View>
        
      );
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'center',
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
  imgbtn: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 55,
    height: 42,
  },
});