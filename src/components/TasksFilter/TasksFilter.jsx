import React from 'react'
import PropTypes from 'prop-types'

const TasksFilter = ({ selectFilter, onChangeFilter }) => {
  return (
    <ul className="filters">
      {['All', 'Active', 'Completed'].map((filter) => (
        <li key={filter}>
          <button className={selectFilter === filter ? 'selected' : ''} onClick={() => onChangeFilter(filter)}>
            {filter}
          </button>
        </li>
      ))}
    </ul>
  )
}

TasksFilter.propTypes = {
  selectFilter: PropTypes.string,
  onChangeFilter: PropTypes.func,
}

export default TasksFilter
