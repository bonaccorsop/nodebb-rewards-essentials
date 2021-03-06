'use strict';

var nbbRequire = require('./lib/nbbRequire');

var plugin = {};
var rewards = nbbRequire('./src/rewards');
var user = nbbRequire('./src/user');


plugin.conditions = require('./lib/conditions');
plugin.conditionals = require('./lib/conditionals');
plugin.rewards = require('./lib/rewards');

plugin.onUpvote = function (data) {
	var uid = data.owner;

	rewards.checkConditionAndRewardUser(uid, 'essentials/user.reputation', function (callback) {
		user.getUserField(uid, 'reputation', callback);
	});
};

plugin.onOnline = function (data) {
	var uid = data.uid;
	var lastOnline = data.timestamp;

	rewards.checkConditionAndRewardUser(uid, 'essentials/user.lastonline', function (callback) {
		callback(false, lastOnline);
	});
};

plugin.onPost = function (data) {
	var uid = data.post.uid;

	rewards.checkConditionAndRewardUser(uid, 'essentials/user.postcount', function (callback) {
		user.getUserField(uid, 'postcount', callback);
	});
};

module.exports = plugin;
