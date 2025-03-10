const mongoose = require('mongoose')
const joi = require('joi')

const NotifySchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    description: {
        type: String,
        // required : true
    },
}, { timestamps: true })

const Notification = ("Notification", NotifySchema)

const validNotification = (obj) => {
    const schema = joi.object({
        title: joi.string().email().required(),
        description: joi.string(),
    })
    return schema.validate(obj);
}

module.exports= {Notification , validNotification}