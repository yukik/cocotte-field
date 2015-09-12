/**
 * dependencies
 */
var Field = require('./field');
var helper = require('cocotte-helper');

// exports
module.exports = NumberField;

/**
 * @method NumberField
 * @param  {Object} config
 */
function NumberField (config) {
  helper.copy(config, this);
}

// プロパティ情報
NumberField.properties = {
  max: {
    type: Number,
    description: ['最大値']
  },
  min: {
    type: Number,
    description: ['最小値'],
    test: function (value, config) {
      if ('max' in config && config.max <= value) {
        throw new Error('maxの値以下に指定してください');
      }
    }
  },
  decimal: {
    type: Number,
    min: 1,
    max: 10,
    description: ['小数点桁数']
  }
};

helper.inherits(NumberField, Field);

/**
 * 値変換
 * @method toValue
 * @param  {Mixed}  value
 * @return {Number} value
 */
NumberField.prototype.toValue = function toValue(value) {
  if(typeof value === 'string'){
    var num = +value;
    return Number.isNaN(num) ? value : num;
  }
  return value;
};

/**
 * 型別の検証
 * @method typeValid
 * @param  {Number} value
 * @param  {String} prefix
 */
NumberField.prototype.typeValid = function typeValid(value, prefix) {
  var msg;
  if (typeof value !== 'number') {
    msg = (prefix || '') + '数値ではありません';
    throw new Error(msg);
  }
  if (this.min !== null && value < this.min) {
    msg = (prefix || '') + this.min + '以上にしてください';
    throw new Error(msg);
  }
  if (this.max !== null && this.max < value) {
    msg = (prefix || '') + this.max + '以下にしてください';
    throw new Error(msg);
  }
  if (this.decimal !== null) {
    var keta = (value.toString().split('.')[1] || '').length;
    if (this.decimal < keta) {
      msg = (prefix || '') + '小数点以下は' + this.decimal + '桁までです';
      throw new Error(msg);
    }
  }
};