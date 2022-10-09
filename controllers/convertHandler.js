function ConvertHandler() {
    /* input = 33.3mi */
    this.getNum = function (input) {
        let re = /[a-z]+$/i;
        let extract = input.split(re.exec(input)).join().split(",").join("");

        if (!/^\d/.test(input)) return 1;

        if (extract.split("/").length >= 3) return undefined;

        if (extract.includes("/")) {
            let arr = extract.split("/");

            return Number(arr[0]) / Number(arr[1]);
        } else {
            return Number(extract);
        }
    };

    this.getUnit = function (input) {
        let re = /[a-z]+$/i;
        let result = re.exec(input);
        
        if (!result) return;
        if (this.spellOutUnit(result[0])) return result[0];
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
                return undefined;
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
                return undefined;
        }
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;
        switch (initUnit.toLowerCase()) {
            case "gal":
                result = initNum * galToL;
                break;
            case "l":
                result = initNum / galToL;
                break;
            case "lbs":
                result = initNum * lbsToKg;
                break;
            case "kg":
                result = initNum / lbsToKg;
                break;
            case "mi":
                result = initNum * miToKm;
                break;
            case "km":
                result = initNum / miToKm;
                break;
            default:
                return undefined;
        }

        return parseFloat(result).toFixed(5);
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        return `${initNum} ${this.spellOutUnit(
            initUnit
        )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    };
}

module.exports = ConvertHandler;
