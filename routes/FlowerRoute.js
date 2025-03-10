const route = require('express').Router()
const { CreateNewFlower, getAllFLowers, getFlowerById, deleteFlower } = require('../Controller/FlowerController')
const photoUpload = require('../middelwares/photoUpload')
route.route('/:id')
    .delete(deleteFlower)
    .get(getFlowerById)
route.route("/")
    .get(getAllFLowers)
    .post(photoUpload.fields([{ name: 'image', maxCount: 1 }]) , CreateNewFlower)


module.exports = route