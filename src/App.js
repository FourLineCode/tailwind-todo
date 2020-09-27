import React, { useState } from 'react'
import clsx from 'clsx'

const App = () => {
	const [visible, setVisible] = useState(false)
	const [tasks, setTasks] = useState([])
	const [input, setInput] = useState('')
	const [newId, setNewId] = useState(0)

	const addTodo = () => {
		if (input === '') return
		const newTask = {
			id: newId,
			name: input,
			done: false,
		}
		setNewId(newId + 1)
		setTasks([...tasks, newTask])
		setInput('')
		setVisible(false)
	}

	const deleteTask = (id) => {
		const newTasks = tasks.filter((task) => task.id !== id)
		setTasks(newTasks)
		setNewId(newId - 1)
	}

	return (
		<div className='App'>
			<div className='flex items-center justify-center h-16 bg-blue-400'>
				<nav className='container flex items-center justify-between'>
					<span className='mx-4 font-bold text-white sm:text-2xl md:text-3xl'>
						Tailwind To-Do
					</span>
					<div>
						<button
							onClick={() => setVisible(!visible)}
							className='px-4 py-2 mx-4 text-white transition duration-500 ease-out bg-red-400 rounded-lg shadow-md hover:bg-red-600 focus:outline-none'>
							Add ToDo
						</button>
						{visible && (
							<div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50'>
								<div className='w-full bg-white rounded-lg shadow-lg md:w-1/4 h-2/4'>
									<div className='flex flex-col justify-center w-full h-full p-2 space-y-2'>
										<label className='text-2xl font-bold text-center'>
											Add a Todo
										</label>
										<textarea
											onChange={(e) => setInput(e.target.value)}
											value={input}
											className='w-full p-2 overflow-hidden text-white bg-gray-400 rounded-md resize-none focus:outline-none focus:bg-gray-700'
											rows={3}></textarea>
										<button
											onClick={() => addTodo()}
											className='w-full px-4 py-2 text-white transition duration-500 ease-out bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none'>
											Add Todo
										</button>
										<button
											onClick={() => setVisible(!visible)}
											className='w-full px-4 py-2 text-white transition duration-500 ease-out bg-red-600 rounded-md hover:bg-blue-800 focus:outline-none'>
											Cancel
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
			<main className='flex justify-center min-h-screen'>
				<div className='container flex justify-center w-full bg-gray-200'>
					{tasks.length <= 0 && (
						<span className='my-auto text-4xl text-gray-700'>
							No Tasks Available
						</span>
					)}
					{tasks.length > 0 && (
						<table className='w-full mt-6 border-2 border-gray-500 table-fixed md:w-3/4'>
							<thead className='border-b-2 border-gray-500'>
								<tr>
									<th className='w-1/2 px-4 py-2 text-center md:w-3/4'>Task</th>
									<th className='w-1/2 px-4 py-2 text-center md:w-1/4'>
										Delete
									</th>
								</tr>
							</thead>
							<tbody>
								{tasks.map((task) => (
									<TableData
										key={task.id}
										task={task.name}
										done={task.done}
										id={task.id}
										onclick={deleteTask}
									/>
								))}
							</tbody>
						</table>
					)}
				</div>
			</main>
		</div>
	)
}

const TableData = ({ task, id, done, onclick }) => {
	return (
		<tr>
			<td
				className={clsx(
					'border px-4 py-2 text-center overflow-x-auto',
					done && 'line-through'
				)}>
				{task}
			</td>
			<td className='px-4 py-2 border'>
				<button
					onClick={() => onclick(id)}
					className='w-full px-4 py-2 text-white transition duration-500 ease-out bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none'>
					Delete
				</button>
			</td>
		</tr>
	)
}

export default App
