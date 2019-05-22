function resultHandler() {

    this.getNum = function (input) {
        var result;
        var a;
        var b;
        let regex = /[a-z]+$/i
        let index = input.search(regex);
        regex = /^([0-9]+(\.[0-9]+)?)(\/([0-9]+\.[0-9]+|[1-9]+))?$/
        let found = regex.exec(input.substr(0, index))
        regex = /\//g;
        var validNumber = input.match(regex);
         if (found !== null) {
             a = +found[1];
             b = found[4] ? +found[4] : 1;
         } else if (validNumber <= 1) {
             a = 1;
             b = 1;
         }
         result = a / b;
        return result;
    };

    this.getUnit = function (input) {
        var result;
        let regex = /[a-z]+$/i
        let index = input.search(regex);
        result = input.substr(index).toLowerCase();
        return result;
    };  

    this.getReturnUnit = function (initUnit) {

        var unit = new Map([["mi","km"],["MI","KM"],["gal","l"],["GAL","L"],["kg","lbs"],["KG","LBS"],["KM","MI"],["km","mi"],["l","gal"],["L","GAL"],["LBS","KG"],["lbs","kg"]])
        var result= unit.get(initUnit);

        return result;
    };

    this.spellOutUnit = function (unit) {
        var unitForm = new Map([["km","Kilometers"],["mi","Miles"],["l","Liters"],["kg","Kilograms"],["gal","Gallon"],["lbs","Pound"]]);
        var result = unitForm.get(unit);

        return result;
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        var quantity = initNum;
        var unit = initUnit.toLowerCase();
        var result;
        if (unit === "mi") {
            result = quantity * miToKm;
    
        }else if (unit === "km") {
            result = quantity / miToKm;
          
            
        } else if (unit === "gal") {
            result = quantity * galToL;
           
            
        } else if (unit === "l") {
            result = quantity / galToL;
            
            string = quantity + " gallons resulted into " + result + " liters";
        } else if (unit === "lbs") {
            result = quantity * lbsToKg;
           
            
        } else if (unit === "kg") {
            
            result = quantity / lbsToKg;
          
            }
        return result.toFixed(5);
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        var result = {
            "init Num": initNum,
            "init Unit": this.spellOutUnit(initUnit.toLowerCase()),
            "convert Num": returnNum,
            "return Unit": this.spellOutUnit(returnUnit.toLowerCase()),
            "string": initNum + " " + this.spellOutUnit(initUnit.toLowerCase()) + " converts to " + returnNum +" "+this.spellOutUnit(returnUnit.toLowerCase())
        };

        return result;
    };

}

module.exports = resultHandler;