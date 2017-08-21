'use strict';

var mobile = require('./mobile');
var password = require('./password');
var account = require('./account');
var contactWay = require('./contactWay');
var price = require('./price');
var bussinessCard = require('./bussinessCard');
var cardId = require('./cardId');
var unSpecial = require('./unSpecial');
var chineseAndSplit = require('./chineseAndSplit');
var identify = require('./identify');
var letterAndNumber = require('./letterAndNumber');
var landlinePhone = require('./landlinePhone');

exports.mobile = mobile.default;
exports.password = password.default;
exports.account = account.default;
exports.contactWay = contactWay.default;
exports.price = price.default;
exports.bussinessCard = bussinessCard.default;
exports.cardId = cardId.default;
exports.unSpecial = unSpecial.default;
exports.chineseAndSplit = chineseAndSplit.default;
exports.identify = identify.default;
exports.letterAndNumber = letterAndNumber.default;
exports.landlinePhone = landlinePhone.default;
