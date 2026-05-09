const multer = require("multer");
const CloudinaryStorage = require("multer-storage-cloudinary").CloudinaryStorage;
const cloudinary = require("../utils/cloudinary");

// FOOD STORAGE
const foodStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "foods",
      resource_type: "image",
      public_id: Date.now() + "-" + file.originalname,
    };
  },
});

// RESTAURANT STORAGE
const restaurantStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "restaurants",
      resource_type: "image",
      public_id: Date.now() + "-" + file.originalname,
    };
  },
});

// UPLOAD INSTANCES
const foodUpload = multer({ storage: foodStorage }); //creates multer middleware for food uploads
const restaurantUpload = multer({ storage: restaurantStorage }); //creates multer middleware for restaurant uploads

module.exports = {
  foodUpload,
  restaurantUpload,
};