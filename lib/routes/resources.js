const router = require('express').Router();
const Resource = require('../models/resource');

module.exports = router

  .post('/',(req, res, next) => {
    req.body.user = req.user.id
    new Resource(req.body).save()
      .then(resource => res.json(resource))
      .catch(next);
  })

  .get('/me', (req, res, next) => {
    Resource.find({ user: req.user.id})
      .populate({ path: 'user', select: 'name _id user'})
      .lean()
      .then(resources => res.json(resources))
      .catch(next);
  })
