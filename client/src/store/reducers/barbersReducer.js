import {
	POST_APPOINTMENT_REQUEST,
	POST_APPOINTMENT_SUCCESS,
	POST_APPOINTMENT_FAIL,
	GET_USER_AVAILABLE_APPOINTMENTS_REQUEST,
	GET_USER_AVAILABLE_APPOINTMENTS_SUCCESS,
	GET_USER_AVAILABLE_APPOINTMENTS_FAIL,
	GET_USER_BOOKED_APPOINTMENTS_REQUEST,
	GET_USER_BOOKED_APPOINTMENTS_SUCCESS,
	GET_USER_BOOKED_APPOINTMENTS_FAIL,
	GET_USER_COMPLETED_APPOINTMENTS_REQUEST,
	GET_USER_COMPLETED_APPOINTMENTS_SUCCESS,
	GET_USER_COMPLETED_APPOINTMENTS_FAIL,
	DELETE_APPOINTMENT_SUCCESS,
	DELETE_APPOINTMENT_FAIL,
	COMPLETE_APPOINTMENT_SUCCESS,
	COMPLETE_APPOINTMENT_FAIL,
	CANCEL_APPOINTMENT_SUCCESS,
	CANCEL_APPOINTMENT_FAIL,
} from '../actions/barberActions'

export default function barbersReducer(state, action) {
	const { type, payload } = action

	switch (type) {
		case POST_APPOINTMENT_REQUEST:
		case GET_USER_AVAILABLE_APPOINTMENTS_REQUEST:
		case GET_USER_BOOKED_APPOINTMENTS_REQUEST:
		case GET_USER_COMPLETED_APPOINTMENTS_REQUEST:
			return {
				...state,
				loading: true,
			}

		case POST_APPOINTMENT_SUCCESS:
			return {
				...state,
				availableAppointments: [...state.availableAppointments, payload],
				loading: false,
			}

		case GET_USER_AVAILABLE_APPOINTMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				availableAppointments: payload,
			}

		case DELETE_APPOINTMENT_SUCCESS:
			return {
				...state,
				loading: false,
				availableAppointments: state.availableAppointments.filter(
					(appointment) => appointment._id !== payload
				),
			}

		case GET_USER_BOOKED_APPOINTMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				bookedAppointments: payload,
			}

		case GET_USER_COMPLETED_APPOINTMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				completedAppointments: payload,
			}

		case COMPLETE_APPOINTMENT_SUCCESS:
			return {
				...state,
				loading: false,
				completedAppointments: [...state.completedAppointments, payload],
				bookedAppointments: state.bookedAppointments.filter(
					(appointment) => appointment._id !== payload._id
				),
			}

		case CANCEL_APPOINTMENT_SUCCESS:
			return {
				...state,
				loading: false,
				bookedAppointments: state.bookedAppointments.filter(
					(appointment) => appointment._id !== payload._id
				),
				availableAppointments: [...state.availableAppointments, payload],
			}
		case POST_APPOINTMENT_FAIL:
		case CANCEL_APPOINTMENT_FAIL:
		case GET_USER_AVAILABLE_APPOINTMENTS_FAIL:
		case GET_USER_BOOKED_APPOINTMENTS_FAIL:
		case DELETE_APPOINTMENT_FAIL:
		case GET_USER_COMPLETED_APPOINTMENTS_FAIL:
		case COMPLETE_APPOINTMENT_FAIL:
			return {
				...state,
				loading: false,
				errors: [...state.errors, payload],
			}

		default:
			return state
	}
}
