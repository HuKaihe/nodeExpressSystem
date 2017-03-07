"use strict";

let express = require('express');
let router = express.Router();
let Admin = require('../model/Admin');

/* GET home page. */
router.get('/', function(req, res, next) {
  Admin.findAll(function (customers) {
      res.render('index', { title: 'Express', customer:customers });
  })
});

module.exports = router;
