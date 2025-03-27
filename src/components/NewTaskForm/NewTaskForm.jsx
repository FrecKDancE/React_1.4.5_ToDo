import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

const NewTaskForm = ({ onAddTask }) => {
  const [newTaskLabel, setNewTaskLabel] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTaskLabel.trim().length > 0) {
      onAddTask(newTaskLabel)
      setNewTaskLabel('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={newTaskLabel}
          onChange={(e) => setNewTaskLabel(e.target.value)}
        />
        <input
          className="min"
          placeholder='Min'
        >
        </input>
        <input
          className="sec"
          placeholder='Sec'
        >
        </input>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
