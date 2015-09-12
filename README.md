cocotte-field
=========

# はじめに

フィールドは値を検証することができます  
**(注意)** 値の保持はできません

実際に使用するためには、継承したクラスから初期化します  
**(注意)** Fieldクラスは抽象クラスです


# 初期化

```
var config = {
  required: true,
  max: 20
};
var textField = new Field.Text(config);
```

# 共通プロパティ

継承クラスによらず共通に設定することができるプロパティです

## required

  + 必須項目
  + 既定値 false
  + 値を設定しなくてはいけません

## readonly
  
  + 読取専用
  + 既定値 false

## validation

  + カスタム検証
  + 既定値 なし
  + 関数を定義します
      + 引数は２つ
      + 第一引数に検証する値を指定します
      + 第二引数に例外発行時のメッセージに接頭語が渡されます(省略可能)

# メソッド

## equal ({Mixed} value, {Mixed} compareTo)

 + 値が同じかどうかを確認します
 + 戻り値は同じ場合はtrue,異なる場合はfalse

## compareTo ({Mixed} value, {Mixed} compareTo)

  + 値を比較し、次の値を返します
    + 比較対象より大きい場合は1
    + 比較対象と同じ場合は0
    + 比較対象より小さい場合は-1
  + nullとの比較はnullを小さいとみなします

## between ({Mixed} value, {Mixed} from, {Mixed} to)

  + 値が指定範囲内かを確認します
  + 戻り値は範囲内の場合はtrue,範囲外の場合はfalse

## valid ({Mixed} value, {Object} skip, {String} prefix)

  + 値を検証します
  + 戻り値はありません
  + 検証に失敗すると、例外が発生します
  + skipで検証を行わない項目を設定することができます
      + 項目をキーにしてtrue/falseを設定します
      + 既定値は全てfalseです
      + 項目は4つ存在します
          + readonly 読み取り専用
          + required 必須
          + type 型
          + validation カスタム検証
  + prefixには例外発行時のメッセージに接頭語を追加する事ができます
      + 既定値は空文字です

## toValue ({Mixed} value)

  + クライアントから入力された文字列を、検証できる型に変換します
  + 変換できない場合は、入力値をそのまま返します

# 継承クラス

型ごとに継承クラスが用意されています  
個別のプロパティを設定することで、検証をさらに制限します

  + Field.Text : 文字列
      + {Number} min : 最小文字長
      + {Number} max : 最大文字長
      + {RegExp} regexp : 正規表現
  + Field.Number : 数値
      + {Number} min : 最小値
      + {Number} max : 最大値
      + {Number} decimal : 最大小数点以下桁数
  + Field.Boolean : 真偽値
  + Field.Date : 日時
      + {Number} min : 最小値
      + {Number} max : 最大値

