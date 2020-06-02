# Cordova Browser-Sync Plugin - 24-11-2019

This is a fork of original Cordova Browser-Sync Plugin 1.1.0, developed by nparashuram.
The purpose of this fork is to become compatible with latest version of Apache Cordova.

Integrating [BrowserSync](http://browsersync.io) into your Cordova workflow.

- Watch files in the `www` folder and automatically reload HTML and CSS in all connected devices
- Use BrowserSync's dashboard to control devices and reload them.
- Synchronize scrolls, clicks and form inputs across multiple devices.
- Supports real devices and emulators for iOS and Android platforms

## Usage - Installation

This is now done automatically but if your browser does still not refresh, try adding the `script-src 'self' 'unsafe-inline';` section inside CSP meta tag (`<meta content=...>`) in index.html file. This is really important for browser-sync to refresh browsers.

> Note that a `--live-reload` parameter is required to include in `cordova run` command.

The presence of this `--live-reload` flag triggers the live reload workflow. Without this flag, the project remains unchanged. This way, the plugin does not have to be removed before packaging it for final deployment.

### Install as a Cordova plugin (easiest)
The simplest way to integrate this in your Cordova workflow is to add it as a plugin

```
cordova plugin add cordova-plugin-browsersync-gen2
```
or
```
cordova plugin add https://github.com/DimitrisRK/cordova-plugin-browsersync-gen2.git
```

and then run the cordova command with `--live-reload`. Samples:
```
cordova run browser --live-reload
cordova run android --live-reload
cordova run ios --live-reload
cordova run --live-reload (will run project using all platforms)
```

## *NEW*
From now on, plugin supports --live-reload with `cordova serve` command.
```
cordova serve --live-reload
```
In that case, default static page server will never run and that's how it should be.

*Note: Setting port using Cordova docs format `cordova server [port]` will not work.
However, you can try setting port using the browser-sync parameter example mentioned below.

## Options
In general, plugin supports most of browser-sync parameters (if not all) in --parameter or --parameter=value formats (no need for quotes).

### Ignoring files
In many cases other hooks may copy over JS, CSS or image assets into folders like `www\lib`, typically from locations like `bower_components`. These hooks may run at `after_prepare` and hence should be ignored in the live reload workflow. To achieve this, run the command as

```
cordova run --live-reload --ignore=lib/**/*.*
```

The `--ignore` commands takes an [anymatch](https://github.com/es128/anymatch) compatible destination relative to the `www` folder.

### Setting custom hostname
Sometimes, depending on your network, your OS will report multiple external IP addresses. If this happens, by default browsersync just picks the first one and hopes for the best.

To override this behaviour and manually select which host you want to use for the external interface, use the `--host` option, for example:

```
cordova run --live-reload --host=192.168.1.1
```

### Setting custom port
If you need to forward ports from your local computer to the device because the device is not in the same network as your device then you may getting an error or red circle.
If this happens the problem could be the `3000` port. Then you can try another one for example `8090` which should work then.

```
cordova run --live-reload --port=8090
```

### Setting custom index file
If you do not have "index.html" in your `config.xml` under `content` node then you need to set this option to the value.
Please use the `--index` option.

```
cordova run --live-reload --index=content.html
```

### Enable https
If you need https you can enable it with this option.
You can use `--https` for example.

```
cordova run --live-reload --https
```
