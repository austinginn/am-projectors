import { Telnet } from 'telnet-client';
import config from '../data/config.json';
import models from '../data/models.json';

//check for all args present
if (process.argv.length !== 4) {
  console.error('Expected 2 arguments - {NAME} {CMD}');
  process.exit(1);
}

//run cmd
if (process.argv[3] === "on") {
  await powerOn(process.argv[2]);
}

if(process.argv[3] === "off") {
  await powerOff(process.argv[2]);
}

if(process.argv[3] === "status") {
  await powerOff(process.argv[2]);
}

console.log("done");

//connect via telnet
async function telnetConnect(ip, port, shell, timeout) {
  const connection = new Telnet();

  const params = {
    host: host,
    port: port,
    shellPrompt: shell, // or negotiationMandatory: false
    timeout: timeout
  }

  try {
    await connection.connect(params)
  } catch (error) {
    console.error(error.msg);
  }

  return connection;
}

async function powerOn(name) {
  //find index to item in config based on name
  const index = config.devices.findIndex(d => d.name == name);

  //check if name was found
  if(index == -1){
    console.error("device with that name was not found");
    return -1;
  }

  const device = config.devices[index];

  //find index in models to specific model
  const model_index = models.models.findIndex(m => m.model == device.model);

  //check if model was found
  if(model_index == -1){
    console.error("model was not found")
    return -1;
  }

  const model = models.models[model_index];

  //connect
  const connection = await telnetConnect(device.ip, model.port, model.shell, model.timeout);

  //power on
  const res = await connection.exec(model.on);

  console.log(res);

  connection.end();

  return res;
}