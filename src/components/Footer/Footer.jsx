import React from 'react'
import PropTypes from 'prop-types'
import TasksFilter from '../TasksFilter/TasksFilter'

const Footer = ({ CountTask, onClearComplited, onChangeFilter, selectFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{CountTask} items left</span>
      <TasksFilter selectFilter={selectFilter} onChangeFilter={onChangeFilter} />
      <button className="clear-completed" onClick={onClearComplited}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  CountTask: PropTypes.number,
  onClearComplited: PropTypes.func,
  onChangeFilter: PropTypes.func,
  selectFilter: PropTypes.string,
}

export default Footer
