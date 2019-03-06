var express = require('express');
var router = express.Router();

/* GET deals listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/rated/:user_id', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:deal_id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
