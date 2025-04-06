import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

const Task = ({ todo, CompletedCurrentTask, DeleteCurrentTask, EditCurrentTask, taskTimer, setTaskTimer }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.label)
  const [timeAgo, setTimeAgo] = useState('')
  const { checked, id, createdDate } = todo
  const { remainingTime, isRunning } = taskTimer

  const handleSubmit = (event) => {
    event.preventDefault()
    EditCurrentTask(todo.id, value)
    setEditing(false)
  }

  useEffect(() => {
    const updateTimeAgo = () => {
      const distance = formatDistanceToNow(createdDate, { addSuffix: true, locale: enUS })
      setTimeAgo(distance)
    }

    updateTimeAgo()

    const interval = setInterval(updateTimeAgo, 1000)

    return () => clearInterval(interval)
  }, [createdDate])

  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  return (
    <li className={checked ? 'completed' : editing ? 'editing' : null}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => CompletedCurrentTask(id)}
          checked={checked}
        />
        <label>
          <span className="description">{todo.label}</span>
          <span className="created">{timeAgo}</span>
          <span className="duration">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </label>
        {isRunning ? <button className="icon icon-pause" onClick={() => setTaskTimer(id, { remainingTime, isRunning: false })}></button> :
          <button className="icon icon-play" onClick={() => setTaskTimer(id, { remainingTime, isRunning: true })}></button>
        }
        <button className="icon icon-edit" onClick={() => setEditing((prevEditing) => !prevEditing)}></button>
        <button className="icon icon-destroy" onClick={() => DeleteCurrentTask(id)}></button>
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input type="text" className="edit" value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    createdDate: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  CompletedCurrentTask: PropTypes.func.isRequired,
  DeleteCurrentTask: PropTypes.func.isRequired,
  EditCurrentTask: PropTypes.func.isRequired,
  taskTimer: PropTypes.shape({
    remainingTime: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
  }).isRequired,
  setTaskTimer: PropTypes.func.isRequired,
}

export default Task
