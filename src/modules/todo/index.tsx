import { useEffect, useState } from "react";
import TodoList from "./TodoList";

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
        <TodoList data={data} handleChecked={handleChecked} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default TodoPage;

