import { TaskStatus } from './../task-status.enum';

export class FilterTaskDto {
  search: string;
  status: TaskStatus;
}
