var numeral = require('numeral');
var express = require('express');
var app = express();
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var flash = require('connect-flash')
var constant = require('../../config/constants');
var mongoose = require('mongoose');
var ArticlesTable = require("../models/ArticlesTable");
const Validator = require('Validator');
const paginate = require('express-paginate');
const empty = require('is-empty');
const path = require('path');
const BaseController = require('./BaseController');
var rules = {
    name: 'required',
    title: 'required',
    description: 'min:6',
    thumbnail: 'emptythumbnail',
    status: 'required',

}
exports.add = async (req, res) => {
    var ArticlesController = new BaseController.Controller(req, res, 'Articles');

    if (req.method == "POST") {
        info = req.flash('info');
        success = req.flash('success');
        error = req.flash('error');
        // await ArticlesController.uploadFile('thumbnail');
        // console.log('--------------'+ArticlesController.getInfoUpload('thumbnail'));
        console.log(ArticlesController.updatData());
        res.redirect('/Articles/add');

    } else if (req.method == "GET") {

        res.render('Articles/add.ejs', {
            title: 'addddddd',
            error: req.flash("error"),
            info: req.flash('info'),
            success: req.flash("success"),
        });
    }
}
