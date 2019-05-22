const chai = require("chai")
const chaiHTTP = require("chai-http")
const assert = chai.assert
var router = require('../routes/index.js')

chai.use(chaiHTTP)

suite("Function Tests",()=>{

    suite("Routing Test",()=>{

        suite('GET /api/convert => conversion object',()=>{
            
            test("Convert 10lt (valid input)",()=>{
                chai.request(router)
                    .get('/api/convert')
                    .query({input: '10lt'})
                    .end((error,res)=>{
                        assert.equal(res.status,200)
                        assert.equal(res.body.initNum,10)
                        assert.equal(res.body.initUnit,'lt')
                        assert.approximately(res.body.returnNum, 2.64172, 0.1)
                        assert.equal(res.body.returnUnit, 'gl')
                        done();
                    });
            });

            test("Convert 32g (invalid input unit)",()=>{

                chai.request(router)
                    .get('/api/convert')
                    .query({input:'32g'})
                    .end((erros,res)=>{
                        assert.equal(res.status,200)
                        assert.isString(res.body)
                        assert.equal(res.body,'Invalid Unit')
                        done()
                    });
            });

            test("Convert 3/7.2/4kg (invalid number)",(done)=>{
                chai.request(router)
                    .get('/api/convert')
                    .query({input: '3/7.2/4kg'})
                    .end((error , res)=>{
                        assert.equal(res.status,200)
                        assert.isString(res,body)
                        assert.equal(res.body,"Invalid Number")
                        done()
                    });
            });

            test("Convert kg (no number)",(done)=>{
                chai.request(router)
                    .get('/api/convert')
                    .query({input:'kg'})
                    .end((error,res)=>{
                        assert.equal(res.status, 200)
                        assert.equal(res.body.initNum, 1)
                        assert.equal(res.body.initUnit, 'kg')
                        assert.approximately(res.body.returnNum, 2.20462442018, 0.1)
                        assert.equal(res.body.returnUnit, 'lb')
                        done();
                    })
            })

            test("Convert 3/7.2/4ug (Invalid Number and Invalid unit)", (done) => {
                 
                chai.request(router)
                     .get('/api/convert')
                     .query({
                         input: '3/7.2/4ug'
                     })
                     .end((error, res) => {
                         assert.equal(res.status, 200)
                         assert.isString(res, body)
                         assert.equal(res.body, "Invalid Number and Invalid unit")
                         done()
                     });
            })

        })
    })
})