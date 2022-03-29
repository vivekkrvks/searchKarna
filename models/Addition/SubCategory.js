// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
      subCategoryName:{
       type:String,
       required:true
   },
   link:{
    type:String,
    required:true
},
   category:{
       categoryName:{
           type:String,
        //    required:true
       },
       link:{
            type:String,
            // required:true
       }
    
    },
   image:{
    url:{
     type:String,
     // required:true
    },
    publicId:{
     type:String,
     // required:true
    }
    },
  
   image:{
       url:{
        type:String,
        // required:true
       },
       publicId:{
        type:String,
        // required:true
       }
   },
   logo:{
       url:{
        type:String,
        // required:true
       },
       publicId:{
        type:String,
        // required:true
       }
   },
   description:{
       type:String,
       default:""
   },

   date: {
    type: Date,
    default: Date.now
  },
   creationDate: {
    type: Date,
    required:true
  },

});

module.exports = SubCategory = mongoose.model("mySubCategory", SubCategorySchema);


// /category