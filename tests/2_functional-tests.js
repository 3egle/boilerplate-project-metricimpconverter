const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
    suite("endpoint test", function () {
        suite("GET /api/convert => converted result", function () {
            test("convert 10L (valid input)", function (done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "10L" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(typeof res.body, "object");
                        assert.equal(res.body.initNum, 10);
                        assert.equal(res.body.initUnit, "L");
                        assert.equal(res.body.returnNum, 2.64172);
                        assert.equal(res.body.returnUnit, "gal");
                    });
                done();
            });

            test("convert 10g (invalid unit)", function (done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "10g" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initUnit, undefined);
                    });
                done();
            });

            test("convert 10 (invalid unit)", function (done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "10" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initUnit, undefined);
                    });
                done();
            });

            test("convert  L (valid unit and default to 1)", function (done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "L" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 1);
                    });
                done();
            });

            test("convert 10/4/3L (invalid number)", function (done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "10/4/3L" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, undefined);
                    });
                done();
            });

            test("convert 10/4/3M (invalid number and unit)", function (done) {
                chai.request(server)
                    .get("/api/convert")
                    .query({ input: "10/4/3M" })
                    .end(function (err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, undefined);
                        assert.equal(res.body.initUnit, undefined);
                    });
                    done()
            });
        });
    });
});
