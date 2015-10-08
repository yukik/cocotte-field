/**
 * dependencies
 */
var Field = require('./field');
var helper = require('cocotte-helper');

// exports
module.exports = BooleanField;

/**
 * @method BooleanField
 * @param  {Object} config
 */
function BooleanField (config) {
  helper.copy(config, this);
}

// プロパティ情報
BooleanField.properties = {};

helper.inherits(BooleanField, Field);

/**
 * 値変換
 * @method toValue
 * @param  {Mixed}   value
 * @return {Boolean} value
 */
BooleanField.prototype.toValue = function toValue(value) {
  switch(value) {

  case 'true':
  case 't':
  case '1':
  case 1:
    return true;

  case 'false':
  case 'f':
  case '0':
  case '':
  case 0:
    return false;

  default:
    return value;

  }
};

/**
 * 型別の検証
 * @method typeValid
 * @param  {Boolean} value
 */
BooleanField.prototype.typeValid = function typeValid(value) {
  if (typeof value !== 'boolean') {
    var msg = '真偽値ではありません';
    throw new Error(msg);
  }
};