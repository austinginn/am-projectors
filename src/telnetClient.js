const net = require('net');

class TelnetClient {
  constructor() {
    this.socket = new net.Socket();
  }

  connect(host, port, timeout) {
    return new Promise((resolve, reject) => {
      let isResolved = false;
  
      const onConnect = () => {
        if (!isResolved) {
          isResolved = true;
          clearTimeout(timeoutId);
          resolve();
        }
      };
  
      const onError = (error) => {
        if (!isResolved) {
          isResolved = true;
          clearTimeout(timeoutId);
          reject(error);
        }
      };
  
      this.socket.once('connect', onConnect);
      this.socket.once('error', onError);
  
      const timeoutId = setTimeout(() => {
        if (!isResolved) {
          isResolved = true;
          this.socket.removeListener('connect', onConnect);
          this.socket.removeListener('error', onError);
          reject(new Error('Connection timeout'));
        }
      }, timeout);
  
      this.socket.connect(port, host);
    });
  }

  write(data) {
    return new Promise((resolve, reject) => {
      this.socket.write(data, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  end() {
    return new Promise((resolve) => {
      this.socket.end(() => {
        resolve();
      });
    });
  }

//   waitForResponse(timeout) {
//     return new Promise((resolve, reject) => {
//       let responseData = '';

//       const onTimeout = () => {
//         this.socket.removeListener('data', onData);
//         reject(new Error('Response timeout'));
//       };

//       const timeoutId = setTimeout(onTimeout, timeout);

//       const onData = (data) => {
//         clearTimeout(timeoutId);
//         this.socket.removeListener('data', onData);
//         responseData += data.toString();
//         resolve(responseData);
//       };

//       this.socket.on('data', onData);

//       this.socket.once('close', () => {
//         clearTimeout(timeoutId);
//         this.socket.removeListener('data', onData);
//         reject(new Error('Connection closed before response'));
//       });

//       this.socket.once('error', (error) => {
//         clearTimeout(timeoutId);
//         this.socket.removeListener('data', onData);
//         reject(error);
//       });

//       this.socket.once('end', () => {
//         clearTimeout(timeoutId);
//         this.socket.removeListener('data', onData);
//         resolve(responseData);
//       });
//     });
//   }

//   async writeWithTimeout(data, timeout) {
//     await this.write(data);
//     return Promise.race([this.waitForResponse(timeout), new Promise((_, reject) => setTimeout(() => reject(new Error('Response timeout')), timeout))]);
//   }

waitForResponse() {
    return new Promise((resolve, reject) => {
      const responseHandler = (response) => {
        resolve(response);
      };
  
      const errorHandler = (error) => {
        reject(error);
      };
  
      const endHandler = () => {
        reject(new Error('Connection ended'));
      };
  
      this.socket.once('data', responseHandler);
      this.socket.once('error', errorHandler);
      this.socket.once('end', endHandler);
    });
  }
  
  async writeWithTimeout(data, timeout) {
    await this.write(data);
  
    return Promise.race([
      this.waitForResponse(),
      new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Response timeout'));
        }, timeout);
  
        this.socket.once('data', (response) => {
          clearTimeout(timeoutId);
          resolve(response);
        });
  
        this.socket.once('error', (error) => {
          clearTimeout(timeoutId);
          reject(error);
        });
      })
    ]);
  }
}

module.exports = TelnetClient;
