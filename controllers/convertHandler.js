function ConvertHandler() {
    /* input = 33.3mi */
    this.getNum = function (input) {
        let re = /^([0-9]+)((\.|\/)[0-9]+)?/;
        let value = re.exec(input);

        if (/\d+\/\d+/.test(value[0])) {
            let frac = value[0].split("/");
            return Number(frac[0]) / Number(frac[1]);
        } else {
            return Number(value[0]);
        }
    };

    this.getUnit = function (input) {
        let re = /[a-z]+$/i;
        let result = re.exec(input);
        return result[0];
    };

    this.getReturnUnit = function (initUnit) {
        switch (initUnit.toLowerCase()) {
            case "mi":
                return "km";
            case "km":
                return "mi";
            case "lbs":
                return "kg";
            case "kg":
                return "lbs";
            case "gal":
                return "L";
            case "l":
                return "gal";
            default:
                return "invalid unit";
        }
    };

    this.spellOutUnit = function (unit) {
        switch (unit.toLowerCase()) {
            case "mi":
                return "miles";
            case "km":
                return "kilometers";
            case "gal":
                return "gallons";
            case "l":
                return "liters";
            case "lbs":
                return "pounds";
            case "kg":
                return "kilograms";
            default:
                return "invalid unit";
        }
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;
        initUnit = initUnit.toLowerCase();

        if (initUnit == "gal") {
            result = initNum * galToL;
        } else if (initUnit == "l") {
            result = initNum / galToL;
        } else if (initUnit == "lbs") {
            result = initNum * lbsToKg;
        } else if (initUnit == "kg") {
            result = initNum / lbsToKg;
        } else if (initUnit == "mi") {
            result = initNum * miToKm;
        } else {
            result = initNum / miToKm;
        }

        return result;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        if (this.spellOutUnit(initUnit) == "invalid unit") {
            return "invalid unit";
        } else {
            return `${initNum} ${this.spellOutUnit(
                initUnit
            )} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(
                returnUnit
            )}`;
        }
    };
}

module.exports = ConvertHandler;
