var Field = require('./field');

Field.Boolean = require('./boolean');
Field.Number  = require('./number');
Field.Text    = require('./text');
Field.Date    = require('./date');

module.exports = Field;

// クライアント用
if (typeof window === 'object') {
  if (!window.Cocotte){
    window.Cocotte = {};
  }
  window.Cocotte.Field = Field;
}
