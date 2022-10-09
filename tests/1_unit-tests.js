const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
    suite("function convertHandler.getNum(input)", function () {
        test("test for whole number", function (done) {
            let input = "10L";
            assert.equal(convertHandler.getNum(input), 10);
            done();
        });

        test("test for decimal", function (done) {
            let input = "10.4L";
            assert.equal(convertHandler.getNum(input), 10.4);
            done();
        });
        test("test for fraction", function (done) {
            let input = "10/4L";
            assert.equal(convertHandler.getNum(input), 2.5);
            done();
        });
        test("test for decimal fraction", function (done) {
            let input = "10.3/4L";
            assert.equal(convertHandler.getNum(input), 2.575);
            done();
        });
        test("test for non numeric input", function (done) {
            let input = "L";
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });

        test("invalid fraction", function (done) {
            let input = "10/3/5L";
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });
    });

    suite("function convertHandler.getUnit(input)", function () {
        test("test for unit", function (done) {
            let input = "10L";

            assert.equal(convertHandler.getUnit(input), "L");
            done();
        });
    });

    suite("function convertHandler.getReturnUnit(initUnit)", function () {
        test("test return unit", function (done) {
            let units = ["gal", "L", "lbs", "kg", "mi", "km"];
            let returnUnit = ["L", "gal", "kg", "lbs", "km", "mi"];
            for (let i = 0; i < units.length; i++) {
                assert.equal(
                    convertHandler.getReturnUnit(units[i]),
                    returnUnit[i]
                );
            }
            done();
        });
    });

    suite("function convertHandler.spellOutUnit(unit)", function () {
        test("text spell out unit", function (done) {
            let units = ["gal", "L", "lbs", "kg", "mi", "km"];
            let spellOutUnit = [
                "gallons",
                "liters",
                "pounds",
                "kilograms",
                "miles",
                "kilometers",
            ];

            for (let i = 0; i < units.length; i++) {
                assert.equal(
                    convertHandler.spellOutUnit(units[i]),
                    spellOutUnit[i]
                );
            }
            done();
        });
    });

    suite("function convertHandler.convert(initNum,initUnit)", function () {
        let FirstPairs = ["gal", "L", "lbs", "kg", "mi", "km"];
        let secondPairs = ["L", "gal", "kg", "lbs", "km", "mi"];
        let results = [37.8541, 2.64172, 4.53592, 22.04624, 16.0934, 6.21373];

        for (let i = 0; i < FirstPairs.length; i++) {
            test(`convert ${FirstPairs[i]} to ${secondPairs[i]}`, function (done) {
                let input = `10${FirstPairs[i]}`;
                let unit = convertHandler.getUnit(input);
                let num = convertHandler.getNum(input);
                assert.equal(convertHandler.convert(num, unit), results[i]);
                done();
            });
        }
    });

    suite(
        "function convertHandler.getString(initNum,initUnit,returnNum,returnUnit)",
        function () {
            test("test get string", function (done) {
                assert.equal(
                    convertHandler.getString(10, "L", 2.64172, "gal"),
                    "10 liters converts to 2.64172 gallons"
                );
                done();
            });
        }
    );
});
