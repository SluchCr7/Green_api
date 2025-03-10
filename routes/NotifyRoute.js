const route = require('express').Router()
const { deleteNotify ,getAllNotifications ,getNotifyById , createNewNotify} = require('../Controller/NotificationController')
route.route('/:id')
    .delete(deleteNotify)
    .get(getNotifyById)
route.route("/")
    .get(getAllNotifications)
    .post(createNewNotify)
module.exports = route