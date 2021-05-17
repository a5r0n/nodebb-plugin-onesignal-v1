var onesignal = require("./library"),
  meta = require.main.require("./src/meta"),
  nconf = require.main.require("nconf"),
  Controllers = {};

Controllers.renderACP = function (req, res) {
  onesignal.getAssociatedUsers(function (err, users) {
    res.render("admin/plugins/onesignal", {
      users: users,
      numAssoc: users.length,
      base_url: nconf.get("url").replace(/\/+$/, ""),
    });
  });
};

Controllers.renderAuthSuccess = function (req, res) {
  res.render("onesignal/assocSuccess");
};

Controllers.renderSettings = function (req, res) {
  onesignal.getUserDevices(req.user.uid, function (err, devices) {
    res.render("onesignal/settings", {
      site_title: meta.config.title || meta.config.browserTitle || "NodeBB",
      setupRequired: res.locals.setupRequired,
      devices: devices,
    });
  });
};

Controllers.getPlayerIds = function (req, res) {
  onesignal.getPlayerIds(req.user.uid, function (err, player_ids) {
    if (!err) {
      players = JSON.parse(player_ids);
      res.json(players);
    } else {
      res.status(500).json(err);
    }
  });
};

module.exports = Controllers;
