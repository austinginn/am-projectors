# Projector Network Control
Control power and check status of supported projector models from terminal or the command line.  Written in NodeJS and compiled for Windows, Macos, and Linux using pkg. Please submit projector requests to [austinleeginn@gmail.com](mailto:austinleeginn@gmail.com)
___

## Quickstart - *OS Dependent*
Download the executable for your OS. And cd into that directory.
```console
cd ~/Downloads
```
Run the projector executable. The required arguments are {IP} {CMD} {MODEL}.
```console
./projector 192.168.1.2 on DU72X
```
## Using Node instead of executable
```console
git clone https://github.com/austinginn/am-projectors.git
cd am-projectors
npm install
npm run projector 192.168.1.2 on DU72X
```
___
## Current Model List
- Vivitek DU72X Series