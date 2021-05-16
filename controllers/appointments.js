const Appointment = require('../models/Appointment')

exports.getAllAppointments = async (req, res) => {
	try {
		const appointments = await Appointment.find()
		const count = await Appointment.countDocuments()

		if (appointments.length === 0) {
			return res.status(200).json({ message: 'No appointments' })
		}

		res.status(200).json({ count, appointments })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.getAppointment = async (req, res) => {
	try {
		const { id } = req.params
		const appointment = await Appointment.findById(id)

		if (appointment) {
			res.status(200).json(appointment)
		} else {
			res.status(404).json({ message: 'No appointment found.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.createAppointment = async (req, res) => {
	try {
		const { time, day } = req.body
		const newAppointment = {
			time,
			day,
		}

		const appointment = await Appointment.create(newAppointment)
		res.status(200).json(appointment)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.updateAppointment = async (req, res) => {
	try {
		const { id } = req.params
		const { time, day } = req.body
		const appointment = await Appointment.findById(id)

		if (appointment) {
			const newData = {
				time: time || appointment.time,
				day: day || appointment.day,
			}

			const updatedAppointment = await Appointment.findByIdAndUpdate(
				id,
				newData,
				{ new: true, runValidators: true }
			)

			res.status(200).json({ appointment: updatedAppointment })
		} else {
			res.status(404).json({ message: 'Appointment not found' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}