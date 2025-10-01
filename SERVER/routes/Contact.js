const express = require('express');
const Router = express.Router();
const {contactUs} = require('../controllers/ContactUs');


Router.post("/contactUs", contactUs);

module.exports = Router;
