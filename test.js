const mockJSON = require('./assets/mock');

const assert = require('assert');

const process = require('./index.js');

const mockData = {
  args: [JSON.parse(mockJSON), JSON.parse(mockJSON)]
}


describe('test Directory Data to JSON Format', function() {
  describe('#check mock data', function() {
    it('type check mock Data', function() {
      assert.equal(typeof mockJSON, 'string');
    });
  });


  describe('#run parse to structure Data', function() {
    it('first Check HTML Format', function() {
      assert.equal(typeof process.blocks.directoryStructure.process(mockData), 'string');
    });
  });
});
