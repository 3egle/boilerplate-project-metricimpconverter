"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
    let convertHandler = new ConvertHandler();

    app.route("/api/convert").get(function (req, res) {
        let input = req.query.input;

        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);

        
        if (!initUnit && !initNum)
            res.status(200).send("invalid number and unit");

        if (!initUnit) res.status(200).send("invalid unit");

        if (!initNum) res.status(200).send("invalid number");

        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);

        let string = convertHandler.getString(
            initNum,
            initUnit,
            returnNum,
            returnUnit
        );

        res.json({ initNum, initUnit, returnNum, returnUnit, string });
    });
};
