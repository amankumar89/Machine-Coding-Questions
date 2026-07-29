import { useEffect, useMemo, useState } from "react";

type DataProps = {
  id: string;
  title: string;
  completed: boolean;
};

const LOCAL_KEYS = "todo-items";

const TodoPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<DataProps[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_KEYS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse localStorage: ", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEYS, JSON.stringify(data));
  });

  const handleChecked = (id: string) => {
    setData((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: trimmedValue,
      completed: false,
    };
    setData((prev) => [...prev, newTask]);
    setInputValue("");
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((task) => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  const todoTask = useMemo(() => {
    return data.filter((item) => !item.completed);
  }, [data]);
  const completedTask = useMemo(() => {
    return data.filter((item) => item.completed);
  }, [data]);

  return (
    <div className="w-[70vw] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Todo App
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            type="text"
            placeholder="Add a new task..."
          />
          <button
            className="disabled px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors font-medium shadow-md"
            type="button"
            onClick={handleAdd}
            disabled={!inputValue.trim()}
          >
            Add
          </button>
        </div>

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
      </div>
    </div>
  );
};

export default TodoPage;

const TaskItem = ({
  task,
  onChecked,
  onDelete,
}: {
  task: DataProps;
  onChecked: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
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
        className={`flex-1 text-gray-700 ${
          task.completed ? "line-through text-gray-400" : ""
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
