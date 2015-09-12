/**
 * dependencies
 */
var Field = require('./field');
var helper = require('cocotte-helper');

// exports
module.exports = DateField;

/**
 * @method DateField
 * @param  {Object} config
 */
function DateField (config) {
  helper.copy(config, this);
}

// プロパティ情報
DateField.properties = {
  max: {
    type: Date,
    description: ['最大値']
  },
  min: {
    type: Date,
    description: ['最小値'],
    test: function (value, config) {
      if ('max' in config && config.max.getTime() <= value.getTime()) {
        throw new Error('maxの値以下に指定してください');
      }
    }
  }
};

helper.inherits(DateField, Field);

/**
 * 値変換
 * @method toValue
 * @param  {Mixed} value
 * @return {Date}  value
 */
DateField.prototype.toValue = function toValue (value) {
  if (typeof value === 'string') {
    var date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date;
  }
  return value;
};

/**
 * 値が同じかどうかを確認します
 * 単純な比較のできないオブジェクトは継承クラスで実装しなおしてください
 * @method equal
 * @param  {Mixed}   value
 * @param  {Mixed}   compareTo
 * @return {Boolean} equal
 */
DateField.prototype.equal = function equal (value, compareTo) {
  if (value === compareTo) {
    return true;

  } else if (value instanceof Date && compareTo instanceof Date) {
    return value.getTime() === compareTo.getTime();

  } else {
    return false;
  }
};

/**
 * 日付を複製し返す
 * @method copy
 * @param  {Date} value
 * @return {Date} copied
 */
DateField.prototype.copy = function copy (value) {
  if (value instanceof Date) {
    return new Date(value);
  } else {
    return value;
  }
};

/**
 * 型別の検証
 * @method typeValid
 * @param  {Date}   value
 * @param  {String} prefix
 */
DateField.prototype.typeValid = function typeValid (value, prefix) {
  var msg;
  if (!(value instanceof Date)) {
    msg = (prefix || '') + '日時ではありません';
    throw new Error(msg);
  }
  if (this.min && value.getTime() < this.min.getTime()) {
    msg = (prefix || '') + this.min + '以上にしてください';
    throw new Error(msg);
  }
  if (this.max && this.max.getTime() < value.getTime()) {
    msg = (prefix || '') + this.max + '以下にしてください';
    throw new Error(msg);
  }
};