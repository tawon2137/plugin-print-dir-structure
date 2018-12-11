var mockJSON = require('./assets/mock');

var assert = require('assert');

var proc = require('./index.js');

var mockData = {
  args: [JSON.parse(mockJSON)]
}


describe('test Directory Data to JSON Format', function() {
  describe('#check mock data', function() {
    it('type check mock Data', function() {
      assert.equal(typeof mockJSON, 'string');
    });
  });


  describe('#run parse to structure Data', function() {
    it('first Check HTML Format', function() {
      var result = typeof proc.blocks.directoryStructure.process(mockData)
      console.log(result);
      assert.equal(result, 'string');
    });
  });
});
