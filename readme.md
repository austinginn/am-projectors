# Projector Network Control
Control power and check status of supported projector models from terminal or the command line.  Written in NodeJS and compiled for Windows, Macos, and Linux using pkg. Please submit projector requests to [austinleeginn@gmail.com](mailto:austinleeginn@gmail.com)
___
## Early Development
This project is early in it's development so some features aren't functioning correctly in my CI/CD pipeline. If you run into any issues send me an email or open an issue and I can help you troubleshoot. Here is a list of known issues:
- Macos ARM binary does not run - this is an issue in the code signing process and can be remedied by running via node, compiling using npm run build, OR downloading the x64 binary instead.

Here are some features I intend to implement:
- NPM build script options for compiling executables with {IP} {CMD} {MODEL} arguments embeded for one click executation.
- Custom timeout message option.
___
## Quickstart - *OS Dependent*
Download the executable for your OS. And cd into that directory.
```console
cd ~/Downloads
```
Set executable permissions.
```console
sudo chmod +x projector-macos-x64 
```
Run the projector executable. The required arguments are {IP} {CMD} {MODEL}.
```console
./projector-macos-x64 192.168.1.2 on DU72X
```
*Note the projector executable name will be specific to your os*
<br>
<br>
Available commands:
- on
- off
- status
## Using Node instead of executable
```console
git clone https://github.com/austinginn/am-projectors.git
cd am-projectors
npm install
npm run start 192.168.1.2 on DU72X
```
___
## Current Model List
- Vivitek DU72X Series