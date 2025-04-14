const mongoose = require('mongoose')
const joi = require('joi')


const FlowerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    Photo : {
        type : Array,
        required : true
    },
    description: {
        type: String,
        required: true,
    },
    water: {
        type: Number,
        required : true
    },
    daysBetweenWater: {
        type: Number,
        required : true
    },
    category: {
        type: String,
        required : true
    },
    sandType: {
        type: String,
        required : true
    },
    light: {
        type: String,
        required : true
    }
}, {
    timestamps : true
})

const Flower = mongoose.model("Flower", FlowerSchema);

const ValidateFlower = (obj) => {
    const schema = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        water: joi.string().required(),
        daysBetweenWater: joi.number().required(),
        category: joi.string().required(),
        sandType: joi.string().required(),
        light : joi.string().required()
    })
    return schema.validate(obj);
}

const ValidateUpdateFlwoer = (obj) => {
    const schema = joi.object({
        name: joi.string(),
        description: joi.string(),
        water: joi.string(),
        daysBetweenWater: joi.number(),
        category: joi.string(),
        sandType: joi.string(),
        light : joi.string()
    })
    return schema.validate(obj)
}

module.exports = {
    Flower,
    ValidateFlower,
    ValidateUpdateFlwoer
}
