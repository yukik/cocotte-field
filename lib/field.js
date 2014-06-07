/*grunt-m2r*/
/*
 * Copyright(c) 2014 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */
'use strict';

/**
 * dependencies
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;

/**
 * alias
 */
var commonSchemaKeys = {
  type: '       {String}         フィールド型',
  caption: '    {String}         表示名',
  required: '   {Boolean}        必須項目',
  validations: '{Array|Function} 検証',
  undefinedTo: '{Mixed}          未設定時の値',
  defaultTo: '  {Mixed}          既定値'
};

/**
 * フィールド
 * @method Field
 * @param  {Object} schema
 */
var Field = function Field (schema) {

  var self = this;

  if (schema === null || schema === void 0) {
    schema = {};
  }

  var err;
  if (typeof schema !== 'object') {
    err = new TypeError('フィールド設定が適切ではありません');
    throw err;
  }

  var schemaKeys = self.schemaKeys;
  var unknown = Object.keys(schema).some(function(x) {
    return !schemaKeys[x] && !commonSchemaKeys[x];
  });
  if (unknown) {
    err = new Error('不明な設定を指定しました');
    throw err;
  }

  /**
   * 表示名
   */
  self.caption = schema.caption || null;

  /**
   * ユーザー検証
   */
  if (schema.validations) {
    var validations = Array.isArray(schema.validations) ?
                          schema.validations : [schema.validations];
    validations.forEach(function(v) {self.addValidation(v);});
  }

  if ('undefinedTo' in schema) {
    this.undefinedTo = schema.undefinedTo;
  }

  if ('defaultTo' in schema) {
    this.setDefaultTo(schema.defaultTo);
  }



};

util.inherits(Field, EventEmitter);

/**
 * 未設定時の値
 * @property {Mixed} undefinedTo
 */
Field.prototype.undefinedTo = null;

/**
 * 未設定時の値
 * @method setUndefinedTo
 * @param  {Mixed}       undefinedTo
 */
Field.prototype.setUndefinedTo = function setUndefinedTo (undefinedTo) {
  if (typeof undefinedTo === 'function') {
    Object.defineProperty(this, 'undefinedTo', {
      get: undefinedTo,
      configurable: true
    });
  } else {
    Object.defineProperty(this, 'undefinedTo', {
      value: undefinedTo,
      configurable: true
    });
  }
};

/**
 * 既定値
 * @property {Mixed} defaultTo
 */
Field.prototype.defaultTo = null;

/**
 * 既定値の設定
 * @method setDefaultTo
 * @param  {Mixed}     defaultTo
 */
Field.prototype.setDefaultTo = function setDefaultTo (defaultTo) {
  if (typeof defaultTo === 'function') {
    Object.defineProperty(this, 'defaultTo', {
      get: defaultTo,
      configurable: true
    });
  } else {
    Object.defineProperty(this, 'defaultTo', {
      value: defaultTo,
      configurable: true
    });
  }
};

/**
 * 検証を追加する
 * @method addValidation
 * @param  {Function}        valid
 */
Field.prototype.addValidation = function addValidation (valid) {
  var err;
  if (typeof valid !== 'function') {
    err = new TypeError('検証の設定に失敗しました');
    throw err;
  }
  if (this.validations) {
    this.validations.push(valid);
  } else {
    this.validations = [valid];
  }
};

/**
 * 検証を削除する
 * @method removeCustomValid
 * @param  {Function} valid
 */
Field.prototype.removeValidation = function removeValidation (valid) {
  if (!this.validations) {
    return;
  }
  this.validations = this.validations.filter(function(v) {
    return v !== valid;
  });
};

/**
 * 検証を行う
 * @method valid2
 * @param  {Mixed} value
 */
Field.prototype.valid2 = function valid2 (value) {
  if (!this.validations) {
    return;
  }
  var self = this;
  this.validations.forEach(function(v){
    v.call(self, value);
  });
};

module.exports = exports = Field;