import { useContext, useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AdminContext } from '../store/contexts/adminContext'
import { NotificationContext } from '../store/contexts/notificationsContext'
import DashboardLayout from './DashboardLayout'

export default function AdminUserProfile() {
	const { id } = useParams()
	const history = useHistory()
	const { loading, user, getUser, updateUser, deleteUser } =
		useContext(AdminContext)
	const { displayNotification } = useContext(NotificationContext)
	//TODO: Get the user from the admin context, then do the same as below.
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [avatar, setAvatar] = useState('')
	const [role, setRole] = useState('')
	const [email, setEmail] = useState('')

	useEffect(() => {
		getUser(id)
	}, [])

	useEffect(() => {
		setFirstName(user.firstName)
		setLastName(user.lastName)
		setAvatar(user.avatar)
		setRole(user.role)
		setEmail(user.email)
	}, [user])

	const deleteHandler = (id) => {
		deleteUser(id, history)
		displayNotification('User deleted successfully.')
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (
			firstName === user.firstName &&
			lastName === user.lastName &&
			email === user.email &&
			role === user.role
		) {
			//FIXME: Notifications are currently not accepting custom messages like below, make it accept custom messages.
			displayNotification('Please make some changes before saving.')
		} else {
			updateUser(user._id, { firstName, lastName, email, role }, history)
			displayNotification('Profile has been updated.')
		}
	}

	return (
		<DashboardLayout currentTab='users'>
			{loading && user === null ? (
				<p>Loading user...</p>
			) : (
				<form
					onSubmit={onSubmitHandler}
					className='pb-4 space-y-8 divide-y divide-gray-200'
				>
					<div className='space-y-8 divide-y divide-gray-200'>
						<div className='pt-8'>
							<div>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Personal Information
								</h3>
								<div className='flex justify-between'>
									<p className='mt-1 text-sm text-gray-500'>
										User Id: {user._id}
									</p>
									<button
										type='button'
										className='px-3 py-1 text-white bg-gray-900 rounded-md'
										onClick={() => deleteHandler(user._id)}
									>
										Delete
									</button>
								</div>
							</div>
							<div className='grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6'>
								<div className='sm:col-span-3'>
									<label
										htmlFor='first_name'
										className='block text-sm font-medium text-gray-700'
									>
										First name
									</label>
									<div className='mt-1'>
										<input
											type='text'
											name='first_name'
											id='first_name'
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											autoComplete='given-name'
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
								</div>
								<div className='sm:col-span-3'>
									<label
										htmlFor='last_name'
										className='block text-sm font-medium text-gray-700'
									>
										Last name
									</label>
									<div className='mt-1'>
										<input
											type='text'
											name='last_name'
											id='last_name'
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											autoComplete='family-name'
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-gray-700'
									>
										Email address
									</label>
									<div className='mt-1'>
										<input
											id='email'
											name='email'
											type='email'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											autoComplete='email'
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<label
										htmlFor='country'
										className='block text-sm font-medium text-gray-700'
									>
										Role
									</label>
									<div className='mt-1'>
										<select
											id='country'
											name='country'
											autoComplete='country'
											value={role}
											onChange={(e) => setRole(e.target.value)}
											className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										>
											<option value='costumer'>Costumer</option>
											<option value='barber'>Barber</option>
											<option value='admin'>Admin</option>
										</select>
									</div>
								</div>
								<div className='sm:col-span-6'>
									<label
										htmlFor='photo'
										className='block text-sm font-medium text-gray-700'
									>
										Photo
									</label>
									<div className='flex items-center mt-1'>
										<span className='w-12 h-12 overflow-hidden bg-gray-100 rounded-full'>
											<img
												className='w-full h-full text-gray-300'
												src={user.avatar}
												alt='avatar'
											/>
										</span>
										<button
											type='button'
											className='px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
										>
											Change
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='pt-5'>
						<div className='flex justify-end'>
							<Link
								to='/users'
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Cancel
							</Link>
							<button
								type='submit'
								className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Save
							</button>
						</div>
					</div>
				</form>
			)}
		</DashboardLayout>
	)
}
