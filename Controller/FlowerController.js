const asyncHandler = require('express-async-handler')
const { Flower, ValidateFlower, ValidateUpdateFlwoer } = require('../Modules/Flowers')
const {v2} = require('cloudinary')
const { cloudRemove , cloudUpload } = require('../config/cloudUpload')
const fs = require('fs')
const path = require('path')
// const CreateNewFlower = async (req, res) => {
//     try {
//         const { name, description, water, daysBetweenWater ,category ,sandType,light } = req.body;
//         // Ensure an image is uploaded
//         if (!req.files || !req.files.image) {
//             return res.status(400).json({ message: "Image file is required." });
//         }

//         let image = req.files.image;
        
//         // Handle cases where `image` might be an array
//         if (Array.isArray(image)) {
//             image = image[0]; // Get the first image
//         }

//         const { error } = ValidateFlower(req.body);
//         if (error) {
//             return res.status(400).json({ message: error.details[0].message });
//         }

//         // Upload the image to Cloudinary
//         const result = await v2.uploader.upload(image.path, { resource_type: "image" });

//         // Create a new product
//         const flower = new Flower({
//             Photo: {
//                 url: result.secure_url,
//                 publicId: result.public_id
//             },
//             name,
//             description,
//             water,
//             daysBetweenWater,
//             sandType,
//             category,
//             light
//         });

//         await flower.save();

//         // Remove the uploaded file from local storage
//         fs.unlinkSync(image.path);

//         res.status(201).json(flower);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
/**
 * @desc Create New Flower
 * @route POST /api/flower
 * @access Public
 */
const CreateNewFlower = async (req, res) => {
    try {
        const { name, description, water, daysBetweenWater, category, sandType, light } = req.body;
        
        // Ensure an image is uploaded
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Image file is required." });
        }

        let image = req.files.image;
        
        // Handle cases where `image` might be an array
        if (Array.isArray(image)) {
            image = image[0]; // Get the first image
        }

        const { error } = ValidateFlower(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Upload the image to Cloudinary
        const result = await v2.uploader.upload(image.path, { resource_type: "image" });
        
        // Remove the uploaded file from local storage after successful upload
        fs.unlink(image.path, (unlinkError) => {
            if (unlinkError) {
                console.error("Failed to delete local image:", unlinkError);
            }
        });

        // Create a new flower entry
        const flower = new Flower({
            Photo: {
                url: result.secure_url,
                publicId: result.public_id
            },
            name,
            description,
            water,
            daysBetweenWater,
            sandType,
            category,
            light
        });

        await flower.save();
        res.status(201).json(flower);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



/**
 * @method DELETE
 * @access public
 * @route /api/flower
 * @desc get All Flowers
 */

const getAllFLowers = asyncHandler(async (req, res) => {
    const Flowers = await Flower.find();
    res.status(200).json(Flowers)
})

/**
 * @method GET
 * @access public
 * @route /api/flower/:id
 * @desc Get Flower
 */

const getFlowerById = asyncHandler(async (req, res) => {
    const flower = await Flower.findById(req.params.id)
    if (!flower) {
        res.status(404).json({message : "Flower Not Found"})
    }
    res.status(200).json(flower)
})

/**
 * @method DELETE
 * @access public
 * @route /api/flower/:id
 * @desc delete Flower
 */

const deleteFlower = asyncHandler(async (req, res) => {
    const flower = await Flower.findById(req.params.id)
    if (!flower) {
        return res.status(404).json({ message: "Flower Not Found" })
    }
    await flower.findByIdAndDelete(req.params.id)
    cloudRemove(flower.image.publicId)
    res.status(200).json({message : "Flower Deleted Successfully"})
})

module.exports = {CreateNewFlower , getAllFLowers , getFlowerById , deleteFlower}