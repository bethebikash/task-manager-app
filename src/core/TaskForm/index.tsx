import { BiListPlus, BiPlus } from 'react-icons/bi'
import { AiOutlineCheck } from 'react-icons/ai'
import { base } from '../../constants/colors'
import { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../providers/TaskProvider';
import { ITask } from '../../@types/task.types';
import { initialTaskValue } from './Task.schema';
import ReactDatePicker from 'react-datepicker';

const TaskForm = () => {
  const { setTaskList, taskList, formData, setFormData } = useContext(TaskContext);

  const [errors, setErrors] = useState<Array<string>>([]);
  const [task, setTask] = useState<ITask>(formData);

  const handleValueChange = (value: number | string | boolean | Date, name: string) => {
    const err = [...errors];
    const taskValue = { ...task, [name]: value }; setTask(taskValue);
    const filteredErr = err.filter(e => e !== name);
    setErrors(filteredErr);
  }

  const handeleAddTask = () => {
    const tasks = [...taskList];
    const err = [];
    let isValid = true;
    if (task.title === '') {
      err.push('title');
      isValid = false;
    } if (task.description === '') {
      err.push('description');
      isValid = false;
    } if (!task.dueDate) {
      err.push('dueDate');
      isValid = false;
    }
    if (isValid) {
      if (task.id) {
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index >= 0) {
          tasks[index] = task;
        }
      } else {
        tasks.push({ ...task, id: Date.now() });
      }
      setTaskList(tasks);
      setFormData({ ...initialTaskValue });
    }
    setErrors(err);
  }

  useEffect(() => {
    setTask(formData);
  }, [formData])


  return (
    <form className="form h-100 p-3" onSubmit={(e) => e.preventDefault()}>
      <div className="py-3 d-flex align-items-center gap-1">
        <BiListPlus color={base.primary} size={24} />
        <h5 className="fs-md fw-bold">{task.id ? 'Update' : 'Add'} Task</h5>
      </div>
      <div className="row">
        <div className="col-md-12 mt-3">
          <label htmlFor='title' className='text-gray-700 mb-1 fs-regular'>Title</label>
          <input className="form-control form-control-sm" placeholder="Task Title" id="title" name="title"
            value={task.title} onChange={(e) => handleValueChange(e.target.value, e.target.name)} />
          {errors.includes('title') && (
            <p className='text-danger fs-sm mt-1'>Title is Required!</p>
          )}
        </div>
        <div className="col-md-12 mt-3">
          <label htmlFor='description' className='text-gray-700 mb-1 fs-regular'>Description</label>
          <textarea className="form-control  form-control-sm mr-3" placeholder="Task Description" id="description" name="description"
            value={task.description} onChange={(e) => handleValueChange(e.target.value, e.target.name)} />
          {errors.includes('description') && (
            <p className='text-danger fs-sm mt-1'>Description is Required!</p>
          )}
        </div>

        <div className="col-md-6 mt-3">
          <label htmlFor='duedate' className='text-gray-700 mb-1 fs-regular'>Due Date</label>
          <ReactDatePicker placeholderText='Due Date' className="form-control form-control-sm" selected={task.dueDate} onChange={(date: Date) => { handleValueChange(date, 'dueDate'); console.log(date, "gere") }} />
          {/* <input className="form-control  form-control-sm" type="date" id="dueDate" name="dueDate"
            value={task.dueDate} onChange={(e) => handleValueChange(e.target.value, e.target.name)} /> */}
          {errors.includes('dueDate') && (
            <p className='text-danger fs-sm mt-1'>Due Date is Required!</p>
          )}
        </div>
        <div className="col-md-6 mt-3">
          <label htmlFor='title' className='text-gray-700 mb-1 fs-regular'>Assign To</label>
          <select id="assignedTo" name="assignedTo" className="form-control form-control-sm" value={task.assignedTo} onChange={(e) => handleValueChange(e.target.value, e.target.name)}>
            <option value="" >Select User</option>
            <option value="Tom Kurt">Tom Kurt</option>
            <option value="Ram Barma">Ram Barma</option>
            <option value="Hari Saran">Hari Saran</option>
          </select>
        </div>
        <div className="col-md-6 mt-3">
          <label htmlFor='status' className='text-gray-700 mb-1 fs-regular'>Staues</label>
          <div className='d-flex align-items-center gap-2 pl-1'>
            <input className="form-control-sm" type="checkbox" name="status" id="status" disabled={!task.id}
              checked={task.status} onChange={(e) => handleValueChange(e.target.checked, e.target.name)} />
            <label htmlFor='status'>Is Completed</label>
          </div>
        </div>
        <div className="col-md-12 mt-3 d-flex justify-content-end align-items-end">
          <button className='btn-add' type='button' onClick={handeleAddTask}>
            {task.id ? (
              <AiOutlineCheck color={base.white} size={20} />
            ) : (
              <BiPlus color={base.white} size={20} />
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default TaskForm