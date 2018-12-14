const {ipcMain} = require('electron');
const WiFiControl = require('wifi-control');
const network = require('network');

WiFiControl.init({
  debug: true,
  // iface: 'wlan0', // mac wlan0 is not available, use en0
  connectionTimeout: 10000
});

ipcMain.on('get-bytes-networks', (event, arg) => {
  WiFiControl.scanForWiFi(function(err, response) {
    if (err) console.log(err);
    
    const bytesAps = response.networks.filter(n => /bytes-.+/g.test(n.ssid))
    // const bytesAps = response.networks
  
    console.log('Found Bytes networks: ', bytesAps)
    event.sender.send('get-bytes-networks-resp', err, bytesAps);
  });
});

ipcMain.on('connect-network', (event, arg) => {
  WiFiControl.connectToAP( {
    ssid: arg.ssid,
    password: '123456789'
  }, function(err, response) {
    if (err) console.log(err);
    console.log(response);

    network.get_active_interface(function(err, interface) {
      if (err) console.log(err);
      console.log(interface);
  
      event.sender.send('connect-network-resp', err, interface);
    })
  });
});
