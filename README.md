# SwitchRPC - Oscar's Version

### The simplest possible Nintendo Switch/Switch 2 Discord integration available for Windows, now with an updated game list with switch 2 games (more soon).

The list of all supported titles is availible in the [supportlist.md](https://github.com/MaestroOscar/SwitchRPC-OscarVer/blob/master/supportlist.md) file.

Entering a title that is not in the support list will still work, although the game's icon will not show up on Discord.

Since the file that handles the supported games is hosted on GitHub and the images for the Rich Presence are stored on Discord Developer, you will not need to update your client when the game list updates; you may simply restart the application.

## 

### Explanation:

SwitchRPCUpdated is the simplest possible implementation of Discord Rich Presence for the Nintendo Switch/Switch 2. Instead of directly interfacing with Nintendo's servers like [nxapi](https://github.com/samuelthomas2774/nxapi), SwitchRPCUpdated has you manually set your Rich Presence by setting a game and a description. While not automatic, this method is reliable and is not going to break when Nintendo updates their APIs, unlike nxapi. This project is mainly intended as a backup in case nxapi stops working, but it can also be used in its own right.

### Why a fork?

This fork of the SwitchRPCUpdated was made because I want to make the app support my switch 1/2 games that I own. After figuring out how the app worked and how to modify the title list, I decided to make this fork so that the app could be made more useful by adding more titles.

### Screenshots:

![image](https://github.com/user-attachments/assets/8e516eb6-d63a-47b8-a071-93443087f461)

![image](https://github.com/user-attachments/assets/c699d099-d7d3-4f9f-8281-a90d17b99712)



**WIP:** Switch 2 Support

## Installation

Currently availible build types:

Windows (Portable)

Builds are availible in the releases section.

## Building from source:

### Prerequisites:

Before building, ensure that `nodejs` and `npm` are installed on your device. Instructions for Linux, macOS, and Windows are provided below:
   
   Option 1:
   Instructions to install node.js and npm are provided by Microsoft [here](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows_).
   
   Option 2:
   [Chocolatey](https://chocolatey.org/install) Package Manager: `choco install nodejs`
   
Additionally, ensure that `electron-builder` and `@electron/packager` are installed through npm:

   Windows:

   `npm install electron-builder @electron/packager -g`

### Building

1. Clone this repository:   
`git clone https://github.com/MaestroOscar/SwitchRPC-OscarVer.git` 
2. Enter the directory:   
`cd SwitchRPCUpdated`
5. Install dependencies (you may need to delete package-lock.json):   
`npm install`
6. Build:   
`electron-builder`
7. Done! Your compiled binaries will be in the `dist` folder.

## Credits

Credits to:

[realdevon](https://github.com/realdevon) for creating the original SwitchRPC.

[queenbiscuit311](https://github.com/queenbiscuit311) for creating the SwitchRPCUdpated Fork.

[simonliii](https://github.com/simonliii) for creating pull request realdevon/SwitchRPC/[#59](https://github.com/realdevon/SwitchRPC/pull/59), which made the games list clickable.

[davidcralph](https://github.com/davidcralph) for creating pull request realdevon/SwitchRPC/[#17](https://github.com/realdevon/SwitchRPC/pull/17), which replaced the `request` package with `axios`.

## Copyright Acknowledgements

### Copyright 2018-2021 NintenZone Technologies. Nintendo Switch, Nintendo Switch 2, the Nintendo Switch logos, and Nintendo Switch 2 logos are property of Nintendo.
