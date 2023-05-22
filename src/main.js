import { Telnet } from 'telnet-client';
import config from '../data/config.json';
import models from '../data/models.json';

//check for all args present
if (process.argv.length !== 4) {
  console.error('Expected 2 arguments - {IP} {CMD}');
  process.exit(1);
}

//run cmd
if (process.argv[3] === "on") {
  await powerOn(process.argv[2]);
}

if (process.argv[3] === "off") {
  await powerOff(process.argv[2]);
}

if (process.argv[3] === "status") {
  await powerOff(process.argv[2]);
}

console.log("done");

//connect via telnet
async function telnetConnect(ip, port, timeout, cmd) {
  const connection = new Telnet();

  const params = {
    host: host,
    port: port,
    negotiationMandatory: false,
    timeout: timeout
  }

  try {
    //connect
    await connection.connect(params);
    console.log("Connected to ", host);

    //listen for data
    connection.on('data', (data) => { 
      console.log('Recieved from ', host, data.toString());
    });

    //inside shell
    connection.shell((err, stream) => {
      if(err) {
        console.error('Error from ', host, err);
        return;
      }

      //send cmd
      stream.write(cmd);

      //receive response
      stream.on('data', (data) => {
        console.log('Received from ', host, data.toString());
      });

      // Close the connection
      stream.end('exit\n');
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    connection.end();
    console.log('Disconnected from, ', host);
  }
}

async function powerOn(ip) {
  //find device and model
  const data = findIndexes(ip);

  //check if found
  if(data.model == null || data.device == null) {
    console.error("device or model not found");
    return -1;
  }

  //exec connection and cmd
  await telnetConnect(data.device.ip, data.model.port, 5000, data.model.status);

  return 0;
}

function findIndexes(ip) {
  let device = null;
  let model = null;

  //find index to item in config based on name
  const index = config.devices.findIndex(d => d.ip == ip);

  //check if name was found
  if (index > -1) {
    device = config.devices[index];
  }

  if (device != null) {
    //find index in models to specific model
    const model_index = models.models.findIndex(m => m.model == device.model);

    //check if model was found
    if (model_index > -1) {
      model = models.models[model_index];
    }
  }

  return { device, model }
}