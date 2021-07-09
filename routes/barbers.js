const express = require('express')
const upload = require('../utils/multer')
const router = express.Router({ mergeParams: true })
const {
	createBarber,
	getBarber,
	getAllBarbers,
	updateBarber,
	uploadAvatar,
	deleteBarber,
	getBarberAvailableAppointments,
} = require('../controllers/barbers')
const { getBarberAppointments } = require('../controllers/appointments')

router.route('/').post(createBarber).get(getAllBarbers)
router.route('/:id').get(getBarber).put(updateBarber).delete(deleteBarber)
router.route('/:id/avatar').put(upload.single('image'), uploadAvatar)
router.route('/:id/appointments').get(getBarberAppointments)
router.route('/:id/appointments/available').get(getBarberAvailableAppointments)

module.exports = router
