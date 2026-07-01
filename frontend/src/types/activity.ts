export interface Activity {
  id: number;
  action: string;
  createdAt: string;

  user: {
    id: number;
    fullName: string;
  };

  task: {
    id: number;
    title: string;
  };
}