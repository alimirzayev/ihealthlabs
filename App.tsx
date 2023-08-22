import {
  DeviceEventEmitter,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { iHealthDeviceManagerModule, BP7Module, PO3Module, PT3SBTModule, HS2Module} from '@ihealth/ihealthlibrary-react-native';
import { useEffect } from 'react';

const filename = 'org_reactjs_native_example_NurseApp33_ios';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('TESTING LOG');
    //* Authenticate SDK with license
    iHealthDeviceManagerModule.sdkAuthWithLicense(filename);

    //* Listener for device discovery
    const scanDeviceListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Scan_Device, (e) => {
      console.log('Device Discovery: ' + JSON.stringify(e));
    });

    //* Listener for successful device connection
    const deviceConnectedListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connected, (e) => {
      console.log('Device Connected: ' + JSON.stringify(e));
    });

    //* Listener for device connection failure
    const deviceConnectFailedListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connect_Failed, (e) => {
      console.log('Device Connection Failed: ' + JSON.stringify(e));
    });

    //! Listener for Blood Monitor notifications 
    const bloodMonitorNotifyListener = DeviceEventEmitter.addListener(BP7Module.Event_Notify, (e) => {
      console.log('Blood Thermometer Device Notification: ' + JSON.stringify(e));
    });

    //! Listener for Thermometer notifications 
    const thermometerNotifyListener = DeviceEventEmitter.addListener(PT3SBTModule.Event_Notify, (e) => {
      console.log('Thermometer Device Notification: ' + JSON.stringify(e));
    });

     //! Listener for Pulse Oximeter notifications 
     const smartPulseNotifyListener = DeviceEventEmitter.addListener(PO3Module.Event_Notify, (e) => {
      console.log('Pulse Oximeter Device Notification: ' + JSON.stringify(e));
    });

     //! Listener for Scale notifications 
     const scaleNotifyListener = DeviceEventEmitter.addListener(HS2Module.Event_Notify, (e) => {
      console.log('Scale Device Notification: ' + JSON.stringify(e));
    });

    //* Clean up listeners when the component unmounts
    return () => {
      scanDeviceListener.remove();
      deviceConnectedListener.remove();
      deviceConnectFailedListener.remove();
      smartPulseNotifyListener.remove();
      scaleNotifyListener.remove();
    };
  });
    

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
          <Text style={{
            textAlign: 'center',
            fontSize: 32,
            color: 'white',
            paddingVertical: 20
          }}>Nurse Mobile App</Text>
      </ScrollView>
    </SafeAreaView>
  );
}


export default App;
