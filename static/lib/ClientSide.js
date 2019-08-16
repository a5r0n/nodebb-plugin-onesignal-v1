"use strict";

/* globals document, $ */

$(document).ready(function() {
  $.getScript("https://cdn.onesignal.com/sdks/OneSignalSDK.js");
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.on("subscriptionChange", function(isSubscribed) {
      console.log("The user's subscription state is now:", isSubscribed);
      OneSignal.push(function() {
        OneSignal.getUserId(function(userId) {
          console.log("OneSignal User ID:", userId);
          fetch("/api/me/onesignal/devices", {
            method: "POST",
            body: JSON.stringify({
              player_id: userId
            })
          })
            .then(function(response) {
              return response.json();
            })
            .then(function(myJson) {
              console.log(JSON.stringify(myJson));
            });
        });
      });
    });
  });
  OneSignal.push(function() {
    OneSignal.init({
      appId: "5dcb3af0-7a2b-4051-880e-22c28adceea5",
      path: "/plugins/nodebb-plugin-onesignal/static/lib/",
      autoResubscribe: true
    });
  });
  console.log("nodebb-plugin-onesignal: loaded");
  // Note how this is shown in the console on the first load of every page
});
