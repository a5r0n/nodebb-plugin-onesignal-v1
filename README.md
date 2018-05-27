# OneSignal Notifications
Allows NodeBB to interface with the onesignal service in order to provide push notifications to user mobile phones.

## Installation
Download and manually extract this repo.

## Configuration

1. Install and activate this plugin.
2. [Register an application via the onesignal website](https://www.onesignal.com/create-client), and obtain a client key and secret.
    * In particular, the `redirect_uri` should be your forum's URL with `/onesignal/auth` appended to it (e.g. `https://community.nodebb.org/onesignal/auth`)
3. Enter the client key and secret into the plugin's setup page (`/admin/onesignal`), and save.
4. Reload NodeBB.

## Credits
[CCoB for the original NodeBB OneSignal](https://github.com/CCob/nodebb-plugin-onesignal)
[NodeBB for the base](https://github.com/NodeBB/nodebb-plugin-pushbullet)
