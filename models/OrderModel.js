const mongoose = require('mongoose')
const orderModel = new mongoose.Schema({
  
    
 dish_id:{
    type:String,
    required:true
},
dishname:{
    type:String,
    required:true
},
dishprice:{
    type:String,
    required:true
},
newPrize:{
    type:String,
    required:true
},
qty:{
    type:String,
    required:true
},
status:{
    type:String,
    default:"pending"
},
table:{
    type:String,
    required:true
},
Time:{
    type:String,
    required:true,
},
Date:{
    type:Date,
    required:true
},
response:{
    type:Date,
    required:true,
    default:"pending"
}

})

module.exports=mongoose.model('orderModel',orderModel)



//  dish_id:{
//     type:String,
//     required:true
// },
// dishname:{
//     type:String,
//     required:true
// },
// dishprice:{
//     type:String,
//     required:true
// },
// newPrize:{
//     type:String,
//     required:true
// },
// qty:{
//     type:String,
//     required:true
// },