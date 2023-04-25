import { BiListUl, BiReset } from 'react-icons/bi'
import { base } from '../../constants/colors'
import TaskItem from './TaskItem'
import { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../providers/TaskProvider'
import { ITask } from '../../@types/task.types'
import ReactDatePicker from 'react-datepicker'

const TaskList = () => {

  const { taskList } = useContext(TaskContext);
  const [tasks, setTasks] = useState<Array<ITask>>(taskList);
  const [dueDate, setDueDate] = useState<Date | null>();
  const [status, setStatus] = useState<string>('');

  const handleFilter = () => {
    const taskArray = [...taskList];
    if (status === '1') {
      const filteredArray = taskArray.filter((t) => (dueDate ? t.dueDate?.toDateString() === dueDate?.toDateString() : true) && t.status === true);
      setTasks(filteredArray);
    } else if (status === '0') {
      const filteredArray = taskArray.filter((t) => (dueDate ? t.dueDate?.toDateString() === dueDate?.toDateString() : true) && t.status === false);
      setTasks(filteredArray);
    } else if (dueDate) {
      const filteredArray = taskArray.filter((t) => t.dueDate?.toDateString() === dueDate?.toDateString());
      setTasks(filteredArray);
    } else {
      setTasks(taskArray);
    }
  }

  const handleReset = () => {
    setDueDate(null);
    setStatus('');
  }

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dueDate, status, taskList])


  return (
    <div className='p-3 d-flex flex-column h-100'>
      <div className='py-3 d-flex justify-content-between align-items-center'>
        <div className="d-flex align-items-center gap-1">
          <BiListUl color={base.primary} size={24} />
          <h5 className="fs-md fw-bold">Task List</h5>
        </div>
        <div className='d-flex align-items-center gap-2'>
          <span>Filter:</span>
          <select id="status" className="form-control form-control-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" >All</option>
            <option value="0">Not Completed</option>
            <option value="1">Completed</option>
          </select>
          <ReactDatePicker placeholderText='Due Date' className="form-control form-control-sm" selected={dueDate} onChange={(date: Date) => setDueDate(date)} />
          <button className='btn btn-link p-1' onClick={handleReset}>
            {(status || dueDate) && (
              <BiReset color={base.secondary} size={24} />
            )}
          </button>
        </div>

      </div>

      <div className='flex-grow-1'>
        {tasks.length > 0 ?
          tasks.map((task) => (
            <TaskItem task={task} key={task.id} />
          )) : <h4 className='text-gray-600'>No Tasks</h4>}
      </div>
    </div>
  )
}

export default TaskList