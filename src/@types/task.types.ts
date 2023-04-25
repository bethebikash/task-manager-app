export interface ITask {
  id: number | string;
  title: string;
  description: string;
  dueDate: Date | undefined;
  status: boolean;
  assignedTo: string;
}