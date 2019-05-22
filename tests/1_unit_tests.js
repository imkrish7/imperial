const chai = require("chai")
var convertHandler = require("../controller/convertHandler.js");
const assert = chai.assert;
var convertHandler = new convertHandler();


suite("Unit Test",()=>{


    suite("Function convertHandler.getNum(input)",()=>{
        test("Whole number input",(done)=>{
            var input = '32L';
            assert.equal(convertHandler.getNum(input),32);
            done();
        })

        test("Decimal input",(done)=>{
            var input = '0.4L';
            assert.equal(convertHandler.getNum(input),0.4);
            done();
        })

         test("Fractional input", (done) => {
             var input = '3/4kg';
             assert.equal(convertHandler.getNum(input), 0.75);
             done();
         })

         test('Fractional Input w/ Decimal', (done) => {
              var input = '0.4/2L';
              assert.equal(convertHandler.getNum(input), 0.2);
              done();
          })

           test('Invalid Input (double fraction)', (done) => {
               var input = '0.4/2/2gal';
               assert.equal(convertHandler.getNum(input), undefined);
               done();
           })

           test('No Numerical Input', (done) => {
               var input = 'gal';
               assert.equal(convertHandler.getNum(input), 1);
               done();
           })
    })


    suite('Function convertHandler.getUnit(input)',() => {

        test('For Each Valid Unit Inputs', function (done) {
            var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            input.forEach(function (ele) {
                var input = '29'+ele
                assert.equal(convertHandler.getUnit(input),ele)
            });
            done();
        });

        test('Unknown Unit Input', function (done) {

            var input = '20g';
            var unit = convertHandler.getUnit(input);
            assert.undefined(convertHandler.getReturnUnit(unit));
            done();
            
        });
    })

      suite('Function convertHandler.getReturnUnit(initUnit)', function () {

          test('For Each Valid Unit Inputs', function (done) {
              var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
              var expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
              input.forEach(function (ele, i) {
                  assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
              });
              done();
          });

      });


      suite('Function convertHandler.spellOutUnit(unit)', function () {

          test('For Each Valid Unit Inputs', function (done) {
              var unitForm = new Map([
                  ["km", "Kilometers"],
                  ["mi", "Miles"],
                  ["l", "Liters"],
                  ["kg", "Kilograms"],
                  ["gal", "Gallon"],
                  ["lbs", "Pound"]
              ]);
              var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

              input.forEach(ele =>{
                  assert.equal(convertHandler.spellOutUnit(ele),unitForm.get(ele));
              })
              
              done();
          });

      });


      suite('Function convertHandler.convert(num, unit)', function () {

          test('Gal to L', function (done) {
              var input = [5, 'gal'];
              var expected = 18.9271;
              assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
              done();
          });

          test('L to Gal', function (done) {

                var input = [3,'l'];
                var expected = 0.79252;
                assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1)

              done();
          });

          test('Mi to Km', function (done) {

                 var input = [2.3, 'Mi'];
                 var expected = 3.70148;
                 assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
              done();
          });

          test('Km to Mi', function (done) {

                var input = [8, 'Km'];
                var expected = 4.97098;
                assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
            
              done();
          });

          test('Lbs to Kg', function (done) {

             var input = [4, 'Lbs'];
             var expected = 1.81437;
             assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
              done();
          });

          test('Kg to Lbs', function (done) {
                var input = [8.8, 'Kg'];
                var expected = 19.40069;
                assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
              done();
          });

      });

})