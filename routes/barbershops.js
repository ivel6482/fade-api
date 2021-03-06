const express = require('express')
const router = express.Router()
const { getBarbersFromBarbershop } = require('../controllers/barbers')
const upload = require('../utils/multer')
const { protect } = require('../middleware/auth')
const {
	getAllBarbershops,
	createBarbershop,
	getBarbershop,
	updateBarbershop,
	deleteBarbershop,
	uploadBanner,
	uploadAvatar,
} = require('../controllers/barbershops')

router
	.route('/')
	.get(getAllBarbershops)
	.post(protect, upload.single('image'), createBarbershop)

router
	.route('/:id')
	.get(getBarbershop)
	.put(updateBarbershop)
	.delete(deleteBarbershop)

router.route('/:id/banner').put(upload.single('image'), uploadBanner)
router.route('/:id/avatar').put(upload.single('image'), uploadAvatar)
router.route('/:id/barbers').get(getBarbersFromBarbershop)
// /barbershops/barbershopId/barbers

module.exports = router
