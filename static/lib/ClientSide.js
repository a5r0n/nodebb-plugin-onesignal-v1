"use strict";

import { Socket } from "net";

/* globals document, $, socket*/
/**/

$(document).ready(function() {
  $.getScript("https://cdn.onesignal.com/sdks/OneSignalSDK.js", function(
    data,
    textStatus,
    jqxhr
  ) {
    Socket.emit("plugins.onesignal.settings.config", (err, appId) => {
      var OneSignal = window.OneSignal || [];
      OneSignal.push(function() {
        OneSignal.push([
          "init",
          {
            appId: appId,
            notifyButton: {
              enable: false,
              position: "bottom-right",
              offset: {
                bottom: "50px"
              }
            },
            autoResubscribe: true
          }
        ]);

        function onSubscribeButtonClicked() {
          window.OneSignal.getUserId(function(userId) {
            const options = {
              method: "POST",
              headers: new Headers({ "Content-Type": "application/json" }),
              body: JSON.stringify({
                player_id: userId
              })
            };
            fetch("/api/me/onesignal/devices", options)
              .then(function(response) {
                return response.json();
              })
              .then(function(myJson) {
                console.log(JSON.stringify(myJson));
              });
          });
        }

        function onUnsubscribeButtonClicked() {}

        OneSignal.on("subscriptionChange", function(isSubscribed) {
          if (isSubscribed) {
            onSubscribeButtonClicked();
          } else {
            onUnsubscribeButtonClicked();
          }
        });
      });
    });
    console.log("nodebb-plugin-onesignal: loaded");
    // Note how this is shown in the console on the first load of every page
  });
});
