import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task/Task'

const TaskList = ({ todos, onCompletedTask, onDeleteTask, onEditTask, taskTimers, setTaskTimers }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          key={todo.id}
          todo={todo}
          CompletedCurrentTask={onCompletedTask}
          DeleteCurrentTask={onDeleteTask}
          EditCurrentTask={onEditTask}
          taskTimer={taskTimers[todo.id]}
          setTaskTimer={(id, timer) => setTaskTimers({ ...taskTimers, [id]: timer })}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onCompletedTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  taskTimers: PropTypes.object.isRequired,
  setTaskTimers: PropTypes.func.isRequired,
}

export default TaskList
