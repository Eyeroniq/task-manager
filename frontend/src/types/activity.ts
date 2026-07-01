export interface Activity {
  id: number;
  action: string;
  details: string;
  createdAt: string;

  user: {
    id: number;
    fullName: string;
    email: string;
  };

  task: {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
  } | null;
}