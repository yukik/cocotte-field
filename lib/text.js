/**
 * dependencies
 */
var Field = require('./field');
var helper = require('cocotte-helper');

// exports
module.exports = TextField;

/**
 * @method TextField
 * @param  {Object} config
 */
function TextField (config) {
  helper.copy(config, this);
}

// プロパティ情報
TextField.properties = {
  max: {
    type: Number,
    min: 1,
    max: 65535,
    description: ['最大文字長']
  },
  min: {
    type: Number,
    min: 0,
    max: 65535,
    description: ['最小文字長'],
    test: function (value, config) {
      if (config.max && config.max <= value) {
        throw new Error('maxの値以下に指定してください');
      }
    }
  },
  regexp: {
    type: RegExp,
    description: ['正規表現']
  }
};

helper.inherits(TextField, Field);

/**
 * 型別の検証
 * @method typeValid
 * @param  {String} value
 * @param  {String} prefix
 */
TextField.prototype.typeValid = function typeValid (value, prefix) {
  var msg;
  if (typeof value !== 'string') {
    msg = (prefix || '') + '文字列ではありません';
    throw new Error(msg);
  }
  var len = value.length;
  if (this.max && this.max < len) {
    msg = (prefix || '') + this.max + '文字以下にしてください';
    throw new Error(msg);
  }
  if (this.min && len < this.min) {
    msg = (prefix || '') + this.min + '文字以上にしてください';
    throw new Error(msg);
  }
  if (this.regexp && !this.regexp.test(value)){
    msg = (prefix || '') + 'フォーマットに違反しています';
    throw new Error(msg);
  }
};
