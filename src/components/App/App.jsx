import React, { useState, useEffect } from 'react'
import './App.css'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TaskList from '../TaskList/TaskList'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [IdX, setIdX] = useState(1)
  const [filter, setFilter] = useState('All')
  const [taskTimers, setTaskTimers] = useState({})

  const addTask = (description, duration) => {
    const newTask = {
      id: IdX,
      label: description,
      checked: false,
      createdDate: Date.now(),
      duration,
    }
    setTasks([...tasks, newTask])
    setIdX(IdX + 1)
    setTaskTimers({ ...taskTimers, [IdX]: { remainingTime: duration, isRunning: false } })
  }

  const CompletedTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task)))
  }

  const DeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    const { [id]: _, ...rest } = taskTimers
    setTaskTimers(rest)
  }

  const EditTask = (id, newLabel) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, label: newLabel } : task)))
  }

  const ClearComplited = () => {
    setTasks(tasks.filter((task) => !task.checked))
  }

  const CountTask = tasks.filter((task) => !task.checked).length

  const SelectFilterTask = tasks.filter((task) => {
    if (filter === 'All') return true
    else if (filter === 'Active') return !task.checked
    else if (filter === 'Completed') return task.checked
  })

  useEffect(() => {
    const intervalIds = {}

    Object.keys(taskTimers).forEach((id) => {
      const { remainingTime, isRunning } = taskTimers[id]
      if (isRunning && remainingTime > 0) {
        intervalIds[id] = setInterval(() => {
          setTaskTimers((prevTimers) => ({
            ...prevTimers,
            [id]: { remainingTime: prevTimers[id].remainingTime - 1, isRunning },
          }))
        }, 1000)
      }
    })

    return () => {
      Object.values(intervalIds).forEach((intervalId) => clearInterval(intervalId))
    }
  }, [taskTimers])

  return (
    <>
      <NewTaskForm onAddTask={addTask} />
      <section className="main">
        <TaskList
          todos={SelectFilterTask}
          onCompletedTask={CompletedTask}
          onDeleteTask={DeleteTask}
          onEditTask={EditTask}
          taskTimers={taskTimers}
          setTaskTimers={setTaskTimers}
        />
        <Footer
          CountTask={CountTask}
          onClearComplited={ClearComplited}
          onChangeFilter={setFilter}
          selectFilter={filter}
        />
      </section>
    </>
  )
}

export default App
