/*
 * @license
 * cocotte-field v0.5.0
 * Copyright(c) 2015 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */

// exports
module.exports = Field;

/**
 * フィールド
 * @class Field
 */
function Field () {
  throw new Error('継承クラスから初期化してください');
}

// プロパティ情報
Field.properties = {
  required: {
    type: Boolean,
    description: [
      '必須',
      '既定値はfalseです'
    ]
  },
  readonly: {
    type: Boolean,
    description: [
      '読取専用',
      '既定値はfalseです'
    ]
  },
  validation: {
    type: Function,
    description: [
      'カスタム検証',
      '入力値のより細かな検証をします',
      '戻り値はなく、違反した場合は例外を投げるように設定します'
    ]
  }
};

/**
 * 文字列やオブジェクトを値に変更します
 * (継承クラスで実装しなおしてください)
 * @method toValue
 * @param  {Mixed} value
 * @return {Mixed} value
 */
Field.prototype.toValue = function toValue (value) {
  return value;
};

/**
 * 値が同じかどうかを確認します
 * (単純な比較のできないオブジェクトは継承クラスで実装しなおしてください)
 * @method equal
 * @param  {Mixed}   value
 * @param  {Mixed}   compareTo
 * @return {Boolean} equal
 */
Field.prototype.equal = function equal (value, compareTo) {
  return value === compareTo;
};

/**
 * 値を比較し、次の値を返します
 * 比較対象より大きい場合は1
 * 比較対象と同じ場合は0
 * 比較対象より小さい場合は-1
 * nullとの比較はnullを小さいとみなします
 * (単純な比較のできないオブジェクトは継承クラスで実装しなおしてください)
 * @method compare
 * @param  {Mixed}  value
 * @param  {Mixed}  compareTo
 * @return {Number} result
 */
Field.prototype.compare = function compare (value, compareTo) {
  if (value === compareTo) {
    return 0;
  } else if (value < compareTo || value === null) {
    return -1;
  } else {
    return 1;
  }
};

/**
 * 値が指定範囲内かを確認します
 * (単純な比較のできないオブジェクトは継承クラスで実装しなおしてください)
 * @method between
 * @param  {Mixed}   value
 * @param  {Mixed}   from
 * @param  {Mixed}   to
 * @return {Boolean} include
 */
Field.prototype.between = function between (value, from, to) {
  return (from === null || from <= value) && (to === null || value <= to);
};

/**
 * 値を複製して返す
 * (オブジェクトは継承クラスで新しいオブジェクトにするよう実装しなおしてください)
 * @method copy
 * @param  {Mixed} value
 * @return {Mixed} copied
 */
Field.prototype.copy = function copy (value) {
  return value;
};

/**
 * 検証
 * @method valid
 * @param {Mixed}  value
 * @param {Object} skip  検証から外す項目
 *                   readonly   読み取り専用
 *                   required   必須
 *                   type       型検証
 *                   validation カスタム検証
 */
Field.prototype.valid = function valid (value, skip) {
  skip = skip || {};
  var msg;
  // 読取専用
  if (!skip.readonly && this.readonly) {
    msg = '読取専用です';
    throw new Error(msg);
  }
  // 必須検証
  if (value === null || value === undefined || value === '') {
    if (!skip.required && this.required) {
      msg = '必須です';
      throw new Error(msg);
    } else {
      return;
    }
  }
  // 型別の検証
  if (!skip.type && this.typeValid) {
    this.typeValid(value);
  }
  // カスタム検証
  if (!skip.validation && this.validation) {
    this.validation(value);
  }
};
