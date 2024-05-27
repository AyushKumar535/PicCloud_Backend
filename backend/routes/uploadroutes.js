const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "day296jea",
    api_key: "225935242689333",
    api_secret: "8pNThx8zUWl8cIDsTVMCazb66Lk"
});
router.post('/uploadfiles', async (req, res) => {
    const { fileUrl } = req.body;
    console.log(fileUrl)
    const uploadResult = await cloudinary.uploader.upload(fileUrl, {
        public_id: "sunny2"
    }).catch((error) => { console.log(error) });

    console.log(uploadResult);
    const optimizeUrl = cloudinary.url(`sunny2`, {
        fetch_format: 'auto',
        quality: 'auto'
    });
    console.log(optimizeUrl);
})
module.exports = router
