import { useContext, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import UserAppointmentsList from '../components/UserAppointmentsList'
import Stats from '../components/Stats'
import { AdminContext } from '../store/contexts/adminContext'
import { UserContext } from '../store/contexts/userContext'
import { PlusIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

export default function AdminAppointments() {
	const { token } = useContext(UserContext)
	const { loading, appointmentsCount, appointments, getAppointments } =
		useContext(AdminContext)

	useEffect(() => {
		getAppointments(token)
		// eslint-disable-next-line
	}, [])

	const stats = [
		{
			name: 'Total Appointments',
			stat: appointmentsCount,
		},
	]

	return (
		<DashboardLayout currentTab='appointments'>
			{loading ? (
				<p>Loading appointments...</p>
			) : (
				<>
					{/* <Stats stats={stats} /> */}
					<div className='flex justify-between gap-2 mb-4 sm:justify-end'>
						<Link
							to='/appointments/new'
							type='button'
							className='flex items-center gap-2 px-3 py-2 text-blue-900 transition bg-white border border-blue-900 rounded-md hover:bg-gray-100'
						>
							<PlusIcon width='20' height='20' /> Create Appointment
						</Link>
						<Link
							to='/appointments/book'
							type='button'
							className='flex items-center gap-2 px-3 py-2 text-gray-200 transition bg-blue-900 rounded-md hover:bg-blue-800'
						>
							<PlusIcon width='20' height='20' /> Book Appointment
						</Link>
					</div>

					<UserAppointmentsList
						title='Appointments'
						appointments={appointments}
					/>
				</>
			)}
		</DashboardLayout>
	)
}
