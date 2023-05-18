const { Telnet } = require('telnet-client');

//load json

//command on endpoint

//command off endpoint

//status endpoint

(async function () {
  const connection = new Telnet()

  // these parameters are just examples and most probably won't work for your use-case.
  const params = {
    host: '127.0.0.1',
    port: 23,
    shellPrompt: '/ # ', // or negotiationMandatory: false
    timeout: 1500
  }

  try {
    await connection.connect(params)
  } catch (error) {
    // handle the throw (timeout)
  }

  const res = await connection.exec('uptime')
  console.log('async result:', res)
})()
Callback-style
const { Telnet } = require('telnet-client')
const connection = new Telnet()

// these parameters are just examples and most probably won't work for your use-case.
const