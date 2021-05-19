import {Linking, Platform} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
export const openInMaps = (lng, lat) => {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${lat},${lng}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  Linking.openURL(url);
};
export const getUserLocation = async () => {
  let location;

  try {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      location = await Location.getLastKnownPositionAsync();
      if (!location) {
        location = await getIPLocation();
        location.type = 'IP';
      }
    } else {
      location = await Location.getCurrentPositionAsync({accuracy: 6});
      location.type = 'GPS';
    }

    if (location)
      location.geo = await getGeoData(
        location.coords.latitude,
        location.coords.longitude,
      );

    return location;
  } catch (error) {
    location = await getIPLocation();
    location.type = 'IP';
    location.geo = await getGeoData(
      location.coords.latitude,
      location.coords.longitude,
    );
  }
};
const getGeoData = async (lat, long) => {
  return await Location.reverseGeocodeAsync({
    latitude: lat,
    longitude: long,
  });
};

const getIPLocation = async () => {
  try {
    const {data} = await axios.get('https://ipinfo.io/json');

    if (data.loc) {
      return {
        coords: {
          latitude: data.loc.split(',')[0] * 1,
          longitude: data.loc.split(',')[1] * 1,
        },
      };
    }
    return {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    };
  } catch (error) {
    return {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    };
  }
};
