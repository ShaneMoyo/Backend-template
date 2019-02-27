const chai = require('chai');
const mongoose = require('mongoose');
const request = require('./request');
const assert = chai.assert;

describe('Resources API', () => {

  let token1 = '';
  let token2 = '';
  let userId1 = '';
  const testResources = [
    {
      name: 'Test resource 1',
    },
    {
      name: 'Test resource 2',
    },
    {
      name: 'Test resource 3',
    }
  ];
  beforeEach(() => mongoose.connection.dropDatabase());
  beforeEach(() => {
    return Promise.all([
      request.post('/api/auth/')
        .send({
          email: 'test1@test.com',
          password: 'password'
        })
        .then(({ body })  => token1 = body ),
      request.post('/api/auth/')
        .send({
          email: 'test2@test.com',
          password: 'password'
        })
        .then(({ body })  => token2 = body )
    ]);
  });

  beforeEach(() => {
    return request.get('/api/auth/verify')
        .set('Authorization', token1)
        .then(({ body })  => userId1 = body)
  })

  it('Should save a resource with an id', () => {
    return request.post('/api/resources')
      .set('Authorization', token1)
      .send(testResources[0])
      .then(({ body: savedResource}) => {
        assert.ok(savedResource._id);
        assert.ok(savedResource.name);
        assert.equal(savedResource.name, testResources[0].name);
        assert.equal(savedResource.user, userId1);
      });
  });

  it('Should get my resources', () => {
    return Promise.all([
      request.post('/api/resources')
        .set('Authorization', token1)
        .send(testResources[0])
        .then(({ body: savedResources }) => savedResources),
      request.post('/api/resources')
        .set('Authorization', token2)
        .send(testResources[1])
        .then(({ body: savedResources }) => savedResources),
    ])
      .then(savedResourcess => {
        return request.get('/api/resources/me')
          .set('Authorization', token1)
          .then(({ body: gotResourcess}) => {
            assert.deepEqual(savedResourcess[0]._id, gotResourcess[0]._id);
            assert.equal(gotResourcess.length, 1)
          });
      });
  });

})
