const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth')
const cloudinary = require('cloudinary').v2;
const Upload = require('../Models/Upload');
const authenticateToken = require('../middlewares/checkAuth');
cloudinary.config({
    cloud_name: "day296jea",
    api_key: "225935242689333",
    api_secret: "8pNThx8zUWl8cIDsTVMCazb66Lk"
});
router.post('/uploadfiles', authenticateToken, async (req, res) => {
    try {
        const { fileUrl } = req.body;
        if (!fileUrl) {
            return res.status(400).json({ message: "fileUrl is required" });
        }

        const userId = req.user._id
        console.log(userId)


        const random_Id = Math.floor((Math.random() * 100000000) + 1);
        const uploadResult = await cloudinary.uploader.upload(fileUrl, {
            public_id: `${random_Id}`,


        }).catch((error) => { console.log(error) });


        console.log(uploadResult);
        const optimizeUrl = cloudinary.url(`${random_Id}`, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log("Optimize URL", optimizeUrl);

        const newLink = new Upload({
            mylink: optimizeUrl,
            user: userId
        })
        await newLink.save();
        res.status(201).json({
            message: "File uploaded Successfully",
            optimizeUrl
        })

    } catch (error) {
        res.status(500).json({
            message: "Some error occcured",
            error
        })
    }

})

// To get All The Images
router.get('/getAllImages', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const allposts = await Upload.find({ user: userId });
        res.status(200).json({
            allposts,
            message: "Posts retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in fetching posts"
        });
    }
});
module.exports = router
