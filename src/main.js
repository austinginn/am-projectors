import config from '../data/config.json' assert {type: 'json'};
import models from '../data/models.json'assert {type: 'json'};
import TelnetClient from './telnetClient.js';

const TIMEOUT = 5000;

const connectToDevice = async (ip, port, timeout, cmd) => {
  const client = new TelnetClient();

  try {
    await client.connect(ip, port, timeout);
    console.log('Connected to: ', ip);

    //send with timeout
    const res = await client.writeWithTimeout(cmd.command, 5000);
    for(let i = 0; i < cmd.responses.length; i++){
      if(res == cmd.responses[i].value){
        console.log(cmd.responses[i].message);
      }
    }

  } catch (error) {
    // console.log(error.message);

    if (error.message == "Response timeout") {
      console.log("Projector powered off");
    } else {
      console.error(error);
    }

  } finally {
    //graceful exit
    await client.end();
    console.log('Disconnected from: ', ip);
  }
}

// check for required args
if (process.argv.length !== 5) {
  console.error('Expected 3 arguments - {IP} {CMD} {MODEL}');
  process.exit(1);
}

const model = getModel(process.argv[4]);
if (model == null) {
  console.error("Model not found");
  process.exit(1);
}

//run cmd
if (process.argv[3] === "on") {
  await connectToDevice(process.argv[2], model.port, TIMEOUT, model.on);
}

if (process.argv[3] === "off") {
  await connectToDevice(process.argv[2], model.port, TIMEOUT, model.off);
}

if (process.argv[3] === "status") {
  await connectToDevice(process.argv[2], model.port, TIMEOUT, model.status);
}

// connectToDevice("192.168.40.100", 23, 5000);

function getModel(id) {
  let model = null;

  //find index in models to specific model
  const model_index = models.models.findIndex(m => m.model == id );

  //check if model was found
  if (model_index > -1) {
    model = models.models[model_index];
  }

  return model;
}