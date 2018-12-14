
const {ipcMain} = require('electron');
const wifi = require('./wifi');

ipcMain.on('get-bytes-networks', async (event, arg) => {
  let networks;
  try {
    networks = await wifi.getNetworks();
  } catch (err) {
    event.sender.send('get-bytes-networks-resp', err, null);
  }

  const bytesAps = networks.filter(n => /bytes-.+/g.test(n.ssid))
  console.log('Found Bytes networs: ', bytesAps)

  event.sender.send('get-bytes-networks-resp', null, bytesAps);
});

ipcMain.on('connect-network', async (event, arg) => {
  let gatewayIp;
  try {
    gatewayIp = await wifi.connect(null, arg.ssid, '123456789');
  } catch (err) {
    event.sender.send('connect-network-resp', err, null);
  }
  event.sender.send('connect-network-resp', null, gatewayIp);
});
