const TodoItem = ({ task, onChecked, onDelete }: TodoItemProps) => {
  return (
    <li className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
      <input
        checked={task.completed}
        type="checkbox"
        name="task"
        id={`task-${task.id}`}
        disabled={task.completed}
        onChange={() => onChecked(task.id)}
        className="w-5 h-5 cursor-pointer accent-indigo-600"
      />
      <span
        className={`flex-1 text-gray-700 ${task.completed ? "line-through text-gray-400" : ""
          }`}
      >
        {task.title}
      </span>
      <button
        className="px-3 py-1.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 active:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
        type="button"
        onClick={() => onDelete(task.id)}
      >
        ✕
      </button>
    </li>
  );
};

export default TodoItem;