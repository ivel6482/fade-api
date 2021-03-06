const User = require('../models/User')
const Appointment = require('../models/Appointment')
const cloudinary = require('../utils/cloudinary')

//------------------------------------------------------------------------------
//          - Get all barbers -
//------------------------------------------------------------------------------
exports.getAllBarbers = async (req, res) => {
	try {
		const barbers = await User.find({ role: 'barber' })
		const count = await User.countDocuments({ role: 'barber' })

		if (barbers.length === 0) {
			return res.status(200).json({ message: 'No barbers' })
		}

		res.status(200).json({ count, barbers })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

//------------------------------------------------------------------------------
//          - Get single barber -
//------------------------------------------------------------------------------

exports.getBarber = async (req, res) => {
	try {
		const { id } = req.params
		const barber = await User.findOne({ _id: id, role: 'barber' }).populate(
			'barbershop',
			'name'
		)
		if (barber) {
			res.status(200).json(barber)
		} else {
			res.status(404).json({ message: 'Barber not found' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

//------------------------------------------------------------------------------
//          - Get barbers from a barbershop-
//------------------------------------------------------------------------------
exports.getBarbersFromBarbershop = async (req, res) => {
	try {
		const { id } = req.params
		const barbers = await User.find({ barbershop: id })

		if (barbers) {
			res.status(200).json({ barbers })
		} else {
			res.status(404).json({ message: 'Barbers not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

//------------------------------------------------------------------------------
//          - Create barber -
//------------------------------------------------------------------------------

exports.createBarber = async (req, res) => {
	try {
		const { firstName, lastName, status, barbershop, specialties } = req.body
		const newBarber = {
			firstName,
			lastName,
			status,
			barbershop,
			specialties,
			role: 'barber',
		}

		const barber = await User.create(newBarber)

		res.status(200).json(barber)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

//------------------------------------------------------------------------------
//          - Update barber -
//------------------------------------------------------------------------------
exports.updateBarber = async (req, res) => {
	try {
		const { id } = req.params
		const { firstName, lastName, email, specialties, status, barbershop } =
			req.body
		const barber = await User.findOne({ _id: id, role: 'barber' })
		if (barber) {
			const updatedData = {
				firstName: firstName || barber.firstName,
				lastName: lastName || barber.lastName,
				email: email || barber.email,
				status: status || barber.status,
				specialties: specialties || barber.specialties,
				barbershop: barbershop || barber.barbershop,
			}

			const updatedBarber = await User.findByIdAndUpdate(id, updatedData, {
				new: true,
				runValidators: true,
			})

			res.status(200).json({ barber: updatedBarber })
		} else {
			res.status(404).json({ message: 'Barber not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

//------------------------------------------------------------------------------
//          - Upload barber avatar -
//------------------------------------------------------------------------------
exports.uploadAvatar = async (req, res) => {
	try {
		const { id } = req.params
		const barber = await User.findOne({ _id: id, role: 'barber' })
		if (barber) {
			if (req.file === undefined) {
				return res.status(400).json({ message: 'Image is required.' })
			}

			if (barber.avatar.cloudinaryId) {
				await cloudinary.uploader.destroy(barber.avatar.cloudinaryId)
			}
			const result = await cloudinary.uploader.upload(req.file.path)
			const updatedData = {
				avatar: {
					url: result.secure_url,
					cloudinaryId: result.public_id,
				},
			}

			const updatedBarber = await User.findByIdAndUpdate(id, updatedData, {
				new: true,
				runValidators: true,
			})

			res.status(200).json({ barber: updatedBarber })
		} else {
			res.status(404).json({ message: 'Barber not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

//------------------------------------------------------------------------------
//          - Delete barber -
//------------------------------------------------------------------------------
exports.deleteBarber = async (req, res) => {
	try {
		const { id } = req.params
		const barber = await User.findOne({ _id: id, role: 'barber' })
		if (barber) {
			if (barber.avatar.cloudinaryId) {
				await cloudinary.uploader.destroy(barber.avatar.cloudinaryId)
			}

			await User.deleteOne({ _id: barber._id })
			res.status(200).json({ message: `${barber.name} has been removed.` })
		} else {
			res.status(404).json({ message: 'Barber not found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.getBarberAvailableAppointments = async (req, res) => {
	try {
		const { id } = req.params
		const appointments = await Appointment.find({
			barberId: id,
			completed: false,
			booked: false,
		}).populate('barberId')

		if (!appointments) {
			return res
				.status(404)
				.json({ message: 'No available appointments found.' })
		}

		res.status(200).json({ appointments })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.getBarberBookedAppointments = async (req, res) => {
	try {
		const { id } = req.params
		const appointments = await Appointment.find({
			barberId: id,
			completed: false,
			booked: true,
		}).populate('barberId')

		if (!appointments) {
			return res.status(404).json({ message: 'No appointments found.' })
		}

		res.status(200).json({ appointments })
	} catch (error) {
		res.status(500).json({ message: 'Server Error.' })
	}
}

exports.getBarberCompletedAppointments = async (req, res) => {
	try {
		const { id } = req.params
		const appointments = await Appointment.find({
			barberId: id,
			completed: true,
			booked: false,
		}).populate('barberId')

		if (!appointments) {
			return res.status(404).json({ message: 'No appointments found.' })
		}

		res.status(200).json({ appointments })
	} catch (error) {
		res.status(500).json({ message: 'Server Error' })
	}
}
