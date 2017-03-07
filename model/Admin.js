"use strict";

let db = require('./db');
let moment = require('moment');

let findAll = (callback) => {
    db.query('select * from tb_customer', callback);
};

exports.findAll = findAll;
