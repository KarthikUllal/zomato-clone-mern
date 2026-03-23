const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

// FOOD STORAGE
const foodStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foods",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// RESTAURANT STORAGE
const restaurantStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "restaurants",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
// UPLOAD INSTANCES
const foodUpload = multer({ storage: foodStorage });
const restaurantUpload = multer({ storage: restaurantStorage });

module.exports = {
  foodUpload,
  restaurantUpload,
};







































// const multer = require("multer");
// const path = require("path");


// // FOOD STORAGE
// const foodStorage = multer.diskStorage({

//   destination: function (req, file, cb) {
//     cb(null, "uploads/foods/");
//   },

//   filename: function (req, file, cb) {

//     const fileName =
//       Date.now() + "-" + file.originalname;

//     cb(null, fileName);
//   }

// });


// // RESTAURANT STORAGE
// const restaurantStorage = multer.diskStorage({

//   destination: function (req, file, cb) {
//     cb(null, "uploads/restaurants/");
//   },

//   filename: function (req, file, cb) {

//     const fileName =
//       Date.now() + "-" + file.originalname;

//     cb(null, fileName);
//   }

// });


// // UPLOAD INSTANCES
// const foodUpload = multer({ storage: foodStorage });

// const restaurantUpload = multer({ storage: restaurantStorage });


// // EXPORT
// module.exports = {
//   foodUpload,
//   restaurantUpload
// };