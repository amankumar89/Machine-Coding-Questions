import { useMemo } from "react";
import TaskItem from "./TodoItem";

const TodoList = ({ data, handleChecked, handleDelete }: TodoListProps) => {

  const { todoTask, completedTask } = useMemo(() => {
    const todo: DataProps[] = [];
    const completed: DataProps[] = [];
    for (const item of data) {
      (item.completed ? completed : todo).push(item);
    }
    return { todoTask: todo, completedTask: completed };
  }, [data]);

  return (
    <>
      <ul className="space-y-3">
        {todoTask.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onChecked={handleChecked}
            onDelete={handleDelete}
          />
        ))}
        {completedTask.length > 0 && (
          <>
            <li className="text-sm font-semibold text-gray-500 mt-6 mb-2">
              Completed ({completedTask.length})
            </li>
            {completedTask.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onChecked={handleChecked}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}
      </ul>
      {data.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          No tasks yet. Add one above!
        </p>
      )}
    </>
  )
}

export default TodoList