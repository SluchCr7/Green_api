const { Notification, validNotification } = require("../Modules/Notification")
const asyncHandler = require('express-async-handler')

/**
 * @desc Create New Notify
 * @route POST /api/notify
 * @access public
 */

const createNewNotify = asyncHandler(async (req, res) => {
    const { error } = validNotification(req.body)
    if (error) return res.status(400).json({ message: "Validate Error" })
    const notify = new Notification({
        title,
        description,
    })
    await notify.save()
    res.status(201).json("Notification Created Success")
})


/**
 * @desc get All Notify
 * @route GET /api/notify
 * @access public
 */

const getAllNotifications = asyncHandler(async (req, res) => {
    const notifys = await Notification.find()
    res.status(200).json(notifys)
})

/**
 * @desc get Notify By ID
 * @route GET /api/notify/:id
 * @access public
 */


const getNotifyById = asyncHandler(async (req, res) => {
    const notify = await Notification.findById(req.params.id)
    if (!notify) {
        res.status(404).json({message : "Notify Not Found"})
    }
    res.status(200).json(notify)
})

/**
 * @method DELETE
 * @access public
 * @route /api/notify/:id
 * @desc delete notify
 */

const deleteNotify = asyncHandler(async (req, res) => {
    const notify = await Notification.findById(req.params.id)
    if (!notify) {
        return res.status(404).json({ message: "Notify Not Found" })
    }
    await notify.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "Notify Deleted Successfully"})
})

module.exports = {deleteNotify ,getAllNotifications ,getNotifyById , createNewNotify}