"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
    let convertHandler = new ConvertHandler();

    app.route("/api/convert").get(function (req, res) {
        let input = req.query.input;
       
        if (!input) res.status(200).send("invalid unit");

        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);

        let resultString = convertHandler.getString(
            initNum,
            initUnit,
            returnNum,
            returnUnit
        );

        let response = {
            initNum,
            initUnit,
            returnNum,
            returnUnit,
            string: resultString,
        };
        if (response.string == "invalid unit") {
            res.status(200).send("invalid unit");
        } else {
            res.status(200).json(response);
        }
    });
};
