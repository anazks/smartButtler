var express = require('express');
const dishmodel = require('../models/dishmodel');
var router = express.Router();
var categoryModel = require('../models/categorymodel');
const { route } = require('.');
const orderModel = require('../models/OrderModel')
/* GET users listing. */

router.get('/', async(req,res)=>{
  try {
  let dishes =await dishmodel.find()
  let cata =  await categoryModel.find();
  console.log(cata)
  res.render('user/userinterface',{dishes,cata});
} catch (error) {
  console.log(error)
 } 
});

router.get('/dishDetails/:cata', async(req,res)=>{
  console.log(req.params.cata)
  let dishes = await dishmodel.find({dishcat:req.params.cata})
  console.log(dishes)
  req.session.dishes =[]
  res.render('user/dishdisplay',{dishes})
})
var newPrize =0;
router.post('/addOrde', async(req,res)=>{
  
  console.log(req.body)
  try {
      let dish = await dishmodel.findOne({_id:req.body.dish_id})
      console.log(dish,"dishwe")
      let {quantity} = req.body;
      let dishprice =dish.dishprice
     
      var Amount = parseInt(quantity) * parseInt(dishprice)
      newPrize = newPrize + Amount; 
      const d = new Date();
      let time = d.getTime();
      let Data = {
        dish_id:dish._id,
        dishname:dish.dishname,
        dishprice:dish.dishprice,
        newPrize:newPrize,
        qty: req.body.quantity,
        Time:time,
        table:req.body.selectedValue

      }
      console.log(Data,"dish.................")
      req.session.dishes.push(Data)
      console.log(req.session.dishes,"dish array")
      console.log(newPrize,"total")
      res.json(newPrize)
  } catch (error) {
      console.log(error)
  }
  
})

router.post('/finishorder',async(req,res)=>{
        try {
            console.log("finish order")
            await orderModel.create(req.session.dishes);
            req.session.dishes= null;
            var orderditems = await orderModel.find();
            console.log(orderditems);
            res.json(data=true)
        } catch (error) {
            console.log(error)
        }
})
router.get('/orderSuccess',(req,res)=>{
      res.json(data=true)
})
router.post('/success',(req,res)=>{
  res.redirect('/users/')
})
module.exports = router;
