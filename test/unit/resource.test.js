const assert = require('chai').assert;
const Resource = require('../../lib/models/resource');

describe('Resource model', () => {

  it('throws error for missing fields', () => {
    const resource = new Resource({});
    const { errors } = resource.validateSync();
    assert.equal(errors.name.kind, 'required');
    assert.equal(errors.user.kind, 'required');
  });

  it('throws errors for incorrect data types', () => {
    const resource = new Resource({
      name: {},
      user: {}
    });
    const { errors } = resource.validateSync();
    assert.equal(errors.name.kind, 'String');
    assert.equal(errors.user.kind, 'ObjectID');
  });
});
