const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");

//Load Category.js Model
const Category = require("../../../../models/Addition/Category");
const SubCategory = require("../../../../models/Addition/SubCategory");

// @type    POST
//@route    /api/v1/addition/category/
// @desc    route for SAVING data for category
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    
    const categoryValues = {
      image:{},
      logo:{}
    };
    categoryValues.user = req.user.id;
    categoryValues.creationDate = new Date();
    categoryValues.categoryName = req.body.categoryName;
//link start

    var strs = req.body.link;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });

    categoryValues.link = rests.toLowerCase()
    categoryValues.image.url = req.body.imageUrl;
    categoryValues.image.publicId = req.body.imageId;
    categoryValues.logo.url = req.body.logoUrl;
    categoryValues.logo.publicId = req.body.logoId;


if (req.body.description == ""){
  categoryValues.description = "";

} else {
  categoryValues.description = req.body.description;
  
}
    //getting last voucher number and making new one 

    //Do database stuff
if(
  req.body.categoryName == undefined || req.body.categoryName == "" ||
  req.body.link == undefined || req.body.link == ""
){

  res.json({
    message: "Title, link are Required field",
    variant: "error"
})

  
    } else if(
      req.body.logoUrl == undefined || req.body.logoUrl == "" 
    ){
      res.json({
        message: " Logo are Required field",
        variant: "error"
      })
    }
   
    
    else {
    
          Category.findOne({
            categoryName: categoryValues.categoryName
          })
            .then(category => {
              //Username already exists
              if (category) {
                res.json({
                  message: "Title Already exist ",
                  variant: "error"
                });
              } else {
                Category.findOne({
                  link: categoryValues.link
                })
                  .then(category => {
                    //Username already exists
                    if (category) {
                      res.json({
                        message: "link Already exist ",
                        variant: "error"
                      });
                    } else {
                      new Category(categoryValues)
                      .save()
                      .then(
                        res.json({
                          message: "Successfully saved",
                          variant: "success"
                        })
                      )
                      .catch(err => console.log(err));
                      
                    }})
                    .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));   

    }
    }
);

// @type    GET
//@route    /api/v1/addition/category/allcategory
// @desc    route for getting all data from  category
// @access  PRIVATE

router.get(
  "/allcategory",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.find({})
      .sort({ date: -1 })
      .then(Category => res.json(Category))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No Category Found", variant: "error" })
      );
  }
);

// @type    get
//@route    /api/v1/addition/category/get/:id
// @desc    route to get single category by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.findOne({
      _id: req.params.id
    }).then(Category => res.json(Category)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

// @type    POST
//@route    /api/v1/addition/category/:id
// @desc    route to update/edit category
// @access  PRIVATE
async function updateMe(req,res,categoryValues){

  Category.findOneAndUpdate(
    { _id: req.params.id },
    { $set: categoryValues },
    { new: true }
  )
    .then(category => {
      if (category){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating category value" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const categoryValues = {    image:{},
    logo:{} };
    categoryValues.user = req.user.id;
    if(req.body.categoryName)categoryValues.categoryName = req.body.categoryName;
   //link start
    if(req.body.link){
      var stru = req.body.link;
      var restu = stru.replace(/  | |   |    |      /gi, function (x) {
        return  "";
      });
      categoryValues.link = restu.toLowerCase()
    };

//link end

if(req.body.imageUrl)categoryValues.image.url = req.body.imageUrl;
if(req.body.imageId)categoryValues.image.publicId = req.body.imageId;
if(req.body.logoUrl)categoryValues.logo.url = req.body.logoUrl;
if(req.body.logoId)categoryValues.logo.publicId = req.body.logoId;

    Category.findOne({categoryName: categoryValues.categoryName})
          .then(category => {
            if(category){
              caId = category._id;
              if (caId == req.params.id) {
                Category.findOne({link:categoryValues.link || "df#$@g#*&"})     
          .then(category => {
            if(category) {
              const catId = category._id;
              if (catId == req.params.id){
                updateMe(req,res,categoryValues)
              } else {
res.json({message: "This Link Already Exist", variant: "error"})

              }

            }else{
              updateMe(req,res,categoryValues)

            }
          })
          .catch(err => console.log( `error in link matching ${err}`))

              }else {
                  res.json ({message: "This title already exist", variant : "error"})

              }
            } else {

              Category.findOne({link:categoryValues.link || "df#$@g#*&"})     
              .then(category => {
                if(category) {
                  const catId = category._id;
                  if (catId == req.params.id){
                    updateMe(req,res,categoryValues)
                  } else {
    res.json({message: "This Link Already Exist", variant: "error"})
    
                  }
    
                }else{
                 updateMe(req,res,categoryValues)
    
                }
              })
              .catch(err => console.log( `error in link matching ${err}`))

            }
          })
          .catch(err => console.log(`Error in title matching ${err}`))

}
);

///////
// /api/v1/addition/category/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    Category.findOne({ _id: id }).then(catData => {
      if (catData) {
        Category.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "category Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/category/allcategory/:searchcategory
// @desc    route for searching of category from searchbox using any text
// @access  PRIVATE
router.get(
  "/allcategory/:searchcategory",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var des = req.user.designation;
    var des1 = "Admin";
    const search = req.params.searchcategory;

    if (des == des1   ) {
    if (isNaN(search)) {
      Category.find({
        categoryName: new RegExp(search, "i")
      })
      .then(Category => res.json(Category))
      .catch(err => res.json({
        message: "Problem in Searching" + err, variant: "success"
      }));
    } 

  } else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }

  }
);

// @type    GET
//@route    /api/v1/addition/category/allCatForPublic
// @desc    route for getting all data from  category
// @access  PRIVATE

router.get(
  "/allCatForPublic",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {

      let categoryData = await Category.aggregate([
       {$project: { categoryName:1,
        link:1,
        logo:1,
          }  
         }    
       ]).exec()
       for(let i=0;i<categoryData.length;i++){
        let catLink = categoryData[i].link;
        let subCategoryData = await SubCategory.aggregate([
          {$match: {"category.link": catLink}},
          {$project: { id:1,
             }  
            }    
          ]).exec()
          categoryData[i].subCategoryLenght = subCategoryData.length;
       }
    res.json(categoryData)
  }
);


module.exports = router;
