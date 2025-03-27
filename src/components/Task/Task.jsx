import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

const Task = ({ todo, CompletedCurrentTask, DeleteCurrentTask, EditCurrentTask }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.label)
  const [timeAgo, setTimeAgo] = useState('')

  const { checked, id, createdDate } = todo

  const handleSubmit = (event) => {
    event.preventDefault()
    EditCurrentTask(todo.id, value)
    setValue(value)
    setEditing(false)
  }

  useEffect(() => {
    const updateTimeAgo = () => {
      const distance = formatDistanceToNow(createdDate, { addSuffix: true, locale: enUS, includeSeconds: true })
      setTimeAgo(distance)
    }

    updateTimeAgo()

    const interval = setInterval(updateTimeAgo, 1000)

    return () => clearInterval(interval)
  }, [createdDate])

  return (
    <li className={checked ? 'completed' : editing ? 'editing' : null}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={(event) => CompletedCurrentTask(id, event.target.checked)}
          checked={checked}
        />
        <label>
          <span className="description">{todo.label}</span>
          <span className="created">{timeAgo}</span>
        </label>
        <button className="icon icon-play"></button>
        <button className="icon icon-pause"></button>
        <button className="icon icon-edit" onClick={() => setEditing((prevEditing) => !prevEditing)}></button>
        <button className="icon icon-destroy" onClick={() => DeleteCurrentTask(id)}></button>

      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input onChange={(event) => setValue(event.target.value)} type="text" className="edit" value={value} />
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
  }).isRequired,
  CompletedCurrentTask: PropTypes.func.isRequired,
  DeleteCurrentTask: PropTypes.func.isRequired,
  EditCurrentTask: PropTypes.func.isRequired,
}

export default Task
