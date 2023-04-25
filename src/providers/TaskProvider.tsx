import { useState, ReactNode, createContext } from 'react';
import { ITask } from '../@types/task.types';
import { initialTaskValue } from '../core/TaskForm/Task.schema';

export interface ITaskContext {
  taskList: Array<ITask>;
  setTaskList: (taskList: Array<ITask>) => void;

  formData: ITask;
  setFormData: (formData: ITask) => void;
}

interface Props {
  children: ReactNode;
}

export const TaskContext = createContext<ITaskContext>({} as ITaskContext);

export function TaskProvider(props: Props) {
  const [taskList, setTaskList] = useState<Array<ITask>>([]);
  const [formData, setFormData] = useState<ITask>(initialTaskValue);

  return (
    <TaskContext.Provider
      value={{
        taskList, setTaskList, formData, setFormData
      }}>
      {props.children}
    </TaskContext.Provider>
  );
}
