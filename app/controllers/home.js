const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const BaseController = require('./BaseController');

exports.home = (req, res) => {
    const Api = new BaseController.ApiStructure(req, res);
    Api.actionInvalid({
        index1: 'value1',
        index2: 'value2',
        index3: 'value3',
        index4: 'value4',
        index5: 'value5'
    });

}
exports.index = (req, res) => {
    var HomeController = new BaseController.Controller(req, res, 'Articles');
    HomeController.index();
}
