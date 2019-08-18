"use strict";

/* globals document, $ */

$(document).ready(function() {
  $.getScript("https://cdn.onesignal.com/sdks/OneSignalSDK.js", function(
    data,
    textStatus,
    jqxhr
  ) {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.push([
        "init",
        {
          appId: "5dcb3af0-7a2b-4051-880e-22c28adceea5",
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
        OneSignal.getUserId(function(userId) {
          const options = {
            method: "POST",
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
