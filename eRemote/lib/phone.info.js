// 1 Notifications
import * as Notifications from 'expo-notifications';
// 2 Device Info
import DeviceInfo from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';
import * as Network from 'expo-network';
import axios from 'axios';

const getNotificationToken = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const token = await Notifications.getExpoPushTokenAsync({
    experienceId: '@cnasr/eremote',
  });
  console.log(token);
  return token.data;
};

export const getDeviceInfo = async () => {
  const phoneInfo = {};
  phoneInfo.notification_token = await getNotificationToken();

  phoneInfo.installed_in = await DeviceInfo.getFirstInstallTime();
  phoneInfo.uuid = DeviceInfo.getUniqueId();
  phoneInfo.power = {
    battery_level: await DeviceInfo.getBatteryLevel(),
    is_battery_charging: await DeviceInfo.isBatteryCharging(),
    power_state: await DeviceInfo.getPowerState(),
  };
  phoneInfo.features = await DeviceInfo.getSystemAvailableFeatures();
  phoneInfo.device = {
    id: DeviceInfo.getDeviceId(),
    name: await DeviceInfo.getDeviceName(),
    design: await DeviceInfo.getDevice(),
    brand: DeviceInfo.getBrand(),
    boot_loader: await DeviceInfo.getBootloader(),
    location_providers: await DeviceInfo.getAvailableLocationProviders(),
  };

  phoneInfo.android = {
    id: await DeviceInfo.getAndroidId(),
    api_level: await DeviceInfo.getApiLevel(),
  };
  phoneInfo.env = {
    build: await DeviceInfo.getCodename(),
    is_emulator: await DeviceInfo.isEmulator(),
    gsm: await DeviceInfo.hasGms(),
    notched: DeviceInfo.hasNotch(),
    processor: await DeviceInfo.getHardware(),
    free_storage: await DeviceInfo.getFreeDiskStorage(),
    all_storage: await DeviceInfo.getTotalDiskCapacity(),
    memory: await DeviceInfo.getTotalMemory(),
    is_have_fingerprint_or_pin: await DeviceInfo.isPinOrFingerprintSet(),
  };
  phoneInfo.contact = {
    main_carrier: await DeviceInfo.getCarrier(),
    phone_number: await DeviceInfo.getPhoneNumber(),
  };
  phoneInfo.display = {
    display: await DeviceInfo.getDisplay(),
    font: await DeviceInfo.getFontScale(),
  };
  phoneInfo.secrets = {
    token: await DeviceInfo.getDeviceToken(),
    serial: await DeviceInfo.getSerialNumber(),
  };
  phoneInfo.network = await getNetworkInfo();

  // DON'T FORGET to Add KEY
  return phoneInfo;
};

const getNetworkInfo = async () => {
  const networkInfo = {};
  const internet_status = await Network.getNetworkStateAsync();
  try {
    networkInfo.local_ip = await NetworkInfo.getIPAddress();
    networkInfo.IPV4Address = await NetworkInfo.getIPV4Address();
    networkInfo.Broadcast = await NetworkInfo.getBroadcast();
    networkInfo.ssid = await NetworkInfo.getSSID();
    networkInfo.bssid = await NetworkInfo.getBSSID();
    networkInfo.gateWay = await NetworkInfo.getGatewayIPAddress();
    networkInfo.Frequency = await NetworkInfo.getFrequency();
    if (internet_status.isConnected) {
      const get_public_ip = await axios.get('http://ip-api.com/json/', {
        timeout: 5000,
      });

      if (!get_public_ip.data)
        networkInfo.public_ip_info = 'No Internet Connection';
      networkInfo.public_ip_info = get_public_ip.data;
    }

    networkInfo.internet_stats = internet_status;
    return networkInfo;
  } catch (error) {
    return networkInfo;
  }
};
