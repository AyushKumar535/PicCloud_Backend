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
    const { fileurl } = req.body;
    console.log(fileurl)
    const uploadResult = await cloudinary.uploader.upload(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNp5cdaIatjCHPZfk5xC3CqZFjq7znBp7uWfgM6ZBU0A&s`, {
        public_id: "test"
    }).catch((error) => { console.log(error) });

    console.log(uploadResult);
    const optimizeUrl = cloudinary.url(`test`, {
        fetch_format: 'auto',
        quality: 'auto'
    });
    console.log(optimizeUrl);
})
module.exports = router
