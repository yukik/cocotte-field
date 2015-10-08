/*global Cocotte*/
var isClient = typeof window === 'object';
var Field = isClient ? Cocotte.Field : require('..');

var config = {
  required: true,
  max: 20
};
var textField = new Field.Text(config);

textField.valid('foo');