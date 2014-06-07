cocotte-field
=========

フィールド定義


# 初期化


```
var schema = {
  caption: 'フィールド1', // 表示名
  validations: [],       // 検証
  defaultTo: 0,          // 既定値

};
var field = new Field (schema);
```

# プロパティ

## undefinedTo

  + 未設定(nullもしくはundefined)時の値

## defaultTo

  + 既定値


# メソッド

## setUndefinedTo (undefinedTo)

  + 未設定時の値を設定します
  + 関数を設定すると関数の戻り値が未設定時の値になります

## setDefaultTo (defualtTo)

  + 既定値を設定します
  + 関数を設定すると関数の戻り値が既定値になります

## addValidation ({Function} validation)

  + 検証を追加します
  + 検証の失敗は例外を発行するようにしてください

## removeValidation ({Function} validation)

  + 検証を削除します

## valid2 (value)

  + 検証を行います