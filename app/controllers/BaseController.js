const numeral = require('numeral');
const bcrypt = require('bcrypt-nodejs');
const dateFormat = require('dateformat');
const jsonwebtoken = require('jsonwebtoken');
const empty = require('is-empty');
const Validator = require('Validator');
const paginate = require('express-paginate');
const path = require('path');
const RESPONSE_CODE_NOT_FOUND = 404;
const RESPONSE_CODE_UN_AUTHORIZATION = 401;
const RESPONSE_CODE_BAD_REQUEST = 500;
const RESPONSE_CODE_SUCCESS = 200;


class ApiStructure {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    };
    sendJson(message, statusCode = 200) {
        this.res.header("Access-Control-Allow-Origin", "http://localhost:8042"); //* will allow from all cross domain
        this.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.res.header("Access-Control-Allow-Methods", "GET");
        this.res.status(statusCode);
        this.res.send(message);
    }
    actionInvalid(message = 'Bad request!') {
        this.sendJson({
            'message': message,
            'data': null
        }, RESPONSE_CODE_BAD_REQUEST);
    }

    actionNotFound(message = 'Data not found!') {
        this.sendJson({
            'message': message,
            'data': null
        }, RESPONSE_CODE_NOT_FOUND);
    }
    actionSuccess(response = {}, message = 'Successful') {
        this.sendJson({
            'success': true,
            'message': message,
            'data': response
        }, RESPONSE_CODE_SUCCESS);
    }

};
class Controller {
    constructor(req, res, TableName) {
        this.req = req;
        this.res = res;
        this.table = require("../models/" + TableName + 'Table');
        this.uploadPath = {};
    };
    async uploadFile(fieldName) {
        if (!empty(this.req.files[fieldName])) {
            let imageData = this.req.files[fieldName];
            var imagePath = `/upload/image/${ this.req.files[fieldName].name}`;
            const directoryPath = path.join(__dirname, `../../public/upload/image/new/${this.req.files[fieldName].name}`);
            // var test = imageData.mv(directoryPath);
            await imageData.mv(directoryPath).then(() => {
                this.uploadPath[fieldName] = imagePath;
            }, (error) => {
                this.uploadPath[fieldName] = false;
            });
        } else {
            return false
        }
    }
    getInfoUpload(fieldName) {
        return this.uploadPath[fieldName];
    }
    updatData() {
        console.log(this.req.body);
    }
    async index() {
        let data = await this.table.find().limit(100).sort().lean().exec();
        this.res.send(data);

    }
}
module.exports = {
    ApiStructure,
    Controller
};
