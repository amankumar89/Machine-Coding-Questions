type DataProps = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoListProps = {
  data: DataProps[];
  handleChecked: (id: string) => void;
  handleDelete: (id: string) => void;
}

type TodoItemProps = {
  task: DataProps;
  onChecked: (id: string) => void;
  onDelete: (id: string) => void;
}