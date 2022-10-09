function ConvertHandler() {
    /* input = 33.3mi */

    let re = /[a-z]/i;

    this.getNum = function (input) {
        if (!re.test(input)) return "invalid unit";

        let result;

        let idx = input.split("").indexOf(input.match(re)[0]);

        let value = input.substring(0, idx);
        if (!value) return 1;
        let fracArr = value.split("/");

        if (idx == 0) return 1;

        if (isNaN(value)) {
            if (fracArr.length > 2) return;
            let val = fracArr[0] / fracArr[1];
            return Number(val);
        } else {
            return Number(value);
        }
    };

    this.getUnit = function (input) {
        if (!re.test(input)) return;

        let idx = input.split("").indexOf(input.match(re)[0]);
        let unit = input.substring(idx).toLowerCase();

        if (!this.getReturnUnit(unit)) return;

        return unit == "l" ? unit.toUpperCase() : unit;
    };
    this.getReturnUnit = function (initUnit) {
        let result = {
            mi: "km",
            km: "mi",
            lbs: "kg",
            kg: "lbs",
            gal: "L",
            l: "gal",
        };

        if (!result[initUnit.toLowerCase()]) return;

        return result[initUnit.toLowerCase()];
    };

    this.spellOutUnit = function (unit) {
        let result = {
            mi: "miles",
            km: "kilometers",
            gal: "gallons",
            l: "liters",
            lbs: "pounds",
            kg: "kilograms",
        };

        if (!result[unit.toLowerCase()]) return;

        return result[unit.toLowerCase()];
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result = {
            gal: initNum * galToL,
            l: initNum / galToL,
            lbs: initNum * lbsToKg,
            kg: initNum / lbsToKg,
            mi: initNum * miToKm,
            km: initNum / miToKm,
        };

        return parseFloat(result[initUnit.toLowerCase()]).toFixed(5);
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        let result;
        result =
            initNum +
            " " +
            this.spellOutUnit(initUnit.toLowerCase()) +
            " converts to " +
            returnNum +
            " " +
            this.spellOutUnit(returnUnit.toLowerCase());

        return result;
    };
}

module.exports = ConvertHandler;
