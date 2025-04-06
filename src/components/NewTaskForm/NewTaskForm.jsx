import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

const NewTaskForm = ({ onAddTask }) => {
  const [newTaskLabel, setNewTaskLabel] = useState('')
  const [minLabel, setMinLabel] = useState('')
  const [secLabel, setSecLabel] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTaskLabel.trim().length > 0 && (minLabel || secLabel)) {
      const duration = parseInt(minLabel || 0) * 60 + parseInt(secLabel || 0)
      onAddTask(newTaskLabel, duration)
      setNewTaskLabel('')
      setMinLabel('')
      setSecLabel('')
    }
    else if (newTaskLabel.trim().length < 1){
      alert('Необходимо указать задачу')
    }
    else if (!minLabel || !secLabel) {
      alert('Необходимо указать время на выполнение задачи (минуты или секунды')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          value={newTaskLabel}
          onChange={(e) => setNewTaskLabel(e.target.value)}
        />
        <input
          className="min"
          placeholder='Min'
          value={minLabel}
          onChange={(e) => setMinLabel(e.target.value)}
        />
        <input
          className="sec"
          placeholder='Sec'
          value={secLabel}
          onChange={(e) => setSecLabel(e.target.value)}
        />
        <button type="submit"></button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
