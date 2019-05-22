var express = require('express');
var router = express.Router();
var convertHandler = require("../controller/convertHandler.js");

var convertHandler = new convertHandler();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/convert',(req,res)=>{
   var input = req.query.input; 
   var unit = convertHandler.getUnit(input); 
   var quantity = convertHandler.getNum(input);
   var to = convertHandler.getReturnUnit(unit);
   var result ;
   if(!isNaN(quantity) && to !==undefined){
        var returnQuantity = convertHandler.convert(quantity, unit);
        result = convertHandler.getString(quantity, unit, returnQuantity, to);
   }
   else if (isNaN(quantity) && to === undefined){

     result = {"Error":"Invalid Number and Invalid unit"}
   }
   else if(isNaN(quantity)){
     result = {"Error":"Invalid Number "}
   }
   else{
     result= {"Error":"Invalid unit"}
   }
   
res.send(result);
   
})

module.exports = router;
