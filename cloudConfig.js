const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//for configuration
cloudinary.config({
  cloud_name :process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET   
});

//define storage   --in  cloudinary account in which folder want to store
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wonderlust_DEV',
      allowedFormates: ["png","jpg","jpeg"],
    },
  });

  // export both
  module.exports={
    cloudinary,storage
  }