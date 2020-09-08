import React, { useState } from 'react'

const App = () => {
	const [visible, setVisible] = useState(false)
	const [tasks, setTasks] = useState([])
	const [input, setInput] = useState('')
	const [newId, setNewId] = useState(0)

	const addTodo = (e) => {
		e.preventDefault()
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
			<div className='bg-blue-400 flex justify-center h-16 items-center'>
				<nav className='container flex justify-between items-center'>
					<span className='sm:text-2xl md:text-3xl font-bold text-white mx-4'>
						Tailwind To-Do
					</span>
					<div>
						<button
							onClick={() => setVisible(!visible)}
							className='rounded-lg shadow-md text-white bg-red-400 hover:bg-red-600 px-4 py-2 mx-4 focus:outline-none transition duration-500 ease-out'>
							Add ToDo
						</button>
						{visible && (
							<div className='bg-gray-500 bg-opacity-50 fixed w-full h-full top-0 left-0 flex justify-center items-center'>
								<div className='bg-white rounded-lg shadow-lg w-full md:w-1/4 h-2/4'>
									<div className='w-full h-full p-2 flex justify-center flex-col space-y-2'>
										<label className='text-2xl text-center font-bold'>
											Add a Todo
										</label>
										<textarea
											onChange={(e) => setInput(e.target.value)}
											value={input}
											className='w-full bg-gray-400 resize-none rounded-md focus:outline-none focus:bg-gray-700 text-white p-2 overflow-hidden'
											rows={3}></textarea>
										<button
											onClick={addTodo}
											className='bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none text-white px-4 py-2 w-full transition duration-500 ease-out'>
											Add Todo
										</button>
										<button
											onClick={() => setVisible(!visible)}
											className='bg-red-600 hover:bg-blue-800 rounded-md focus:outline-none text-white px-4 py-2 w-full transition duration-500 ease-out'>
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
				<div className='container bg-gray-200 flex justify-center w-full'>
					{tasks.length <= 0 && (
						<span className='text-gray-700 text-4xl my-auto'>
							No Tasks Available
						</span>
					)}
					{tasks.length > 0 && (
						<table className='table-fixed border-gray-500 border-2 mt-6 w-full md:w-3/4'>
							<thead className='border-b-2 border-gray-500'>
								<tr>
									<th className='w-1/2 md:w-3/4 px-4 py-2 text-center'>Task</th>
									<th className='w-1/2 md:w-1/4 px-4 py-2 text-center'>
										Delete
									</th>
								</tr>
							</thead>
							<tbody>
								{tasks.map((task) => (
									<TableData
										task={task.name}
										onclick={deleteTask}
										done={task.done}
										id={task.id}
										key={task.id}
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

const TableData = ({ task, onclick, id, done = false }) => {
	const classes = done
		? 'border px-4 py-2 text-center overflow-x-auto line-through'
		: 'border px-4 py-2 text-center overflow-x-auto'
	return (
		<tr>
			<td className={classes}>{task}</td>
			<td className='border px-4 py-2'>
				<button
					onClick={() => onclick(id)}
					className='rounded-lg w-full shadow-md text-white bg-red-600 hover:bg-red-700 px-4 py-2 focus:outline-none transition duration-500 ease-out'>
					Delete
				</button>
			</td>
		</tr>
	)
}

export default App
