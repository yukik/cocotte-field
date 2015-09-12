var Field = require('..');

var text = new Field.Text();

var assert = require('assert');


assert.ok(function(){
  text.valid('foo');
});

assert.throws(function(){
  text.valid(1);
});

