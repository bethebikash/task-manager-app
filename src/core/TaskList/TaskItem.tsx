import { useContext } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { base } from '../../constants/colors';
import { ITask } from '../../@types/task.types';
import { TaskContext } from '../../providers/TaskProvider';

interface ITaskItem {
  task: ITask;
}
const TaskItem = (props: ITaskItem) => {
  const { task } = props;
  const { taskList, setTaskList, setFormData } = useContext(TaskContext);

  const handleDelete = () => {
    const tasks = [...taskList];
    const filteredTask = tasks.filter((t) => t.id !== task.id);
    setTaskList(filteredTask);
  }

  const handleEdit = () => {
    setFormData(task);
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tasks = [...taskList];
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index >= 0) {
      tasks[index].status = e.target.checked;
      setTaskList(tasks);
    }
  }

  return (
    <div className='border border-primary rounded p-3 mb-2'>
      <div className="d-flex w-100 h-100 gap-3">
        <input type="checkbox" name="status" checked={task.status} onChange={handleCheck} />
        <div className="flex-grow-1 divider-left divider-right">
          <h5 className='fw-semibold text-gray-800 pb-2'>{task.title}</h5>
          <p className='text-gray-700'>{task.description}</p>
          <div className="d-flex justify-content-between mt-3">
            <p className='text-gray-600'><span className='text-gray-500'>Due Date: </span>{task.dueDate?.toDateString()}</p>
            <p className='text-gray-600'><span className='text-gray-500'>Assigned To: </span>{task.assignedTo}</p>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-link p-1" type='button' onClick={handleEdit}>
            <AiFillEdit color={base.secondary} />
          </button>
          <button className="btn btn-link p-1" type='button' onClick={handleDelete}>
            <AiFillDelete color={base.danger} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem