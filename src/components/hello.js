import React, { useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";

const initialTasks = [
  { id: "1", title: "Task 1", category: "To-Do" },
  { id: "2", title: "Task 2", category: "In Progress" },
  { id: "3", title: "Task 3", category: "Done" },
];

const categories = ["To-Do", "In Progress", "Done"];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  // Handle the drag and drop event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Update task order on drag and drop
    const activeIndex = tasks.findIndex((task) => task.id === active.id);
    const overIndex = tasks.findIndex((task) => task.id === over.id);

    if (activeIndex !== overIndex) {
      const newTasks = arrayMove(tasks, activeIndex, overIndex);
      setTasks(newTasks);
    }
  };

  return (
    <div className="App">
      <DndContext onDragEnd={handleDragEnd}>
        {categories.map((category) => (
          <TaskColumn key={category} category={category} tasks={tasks.filter((task) => task.category === category)} />
        ))}
      </DndContext>
    </div>
  );
}

function TaskColumn({ category, tasks }) {
  return (
    <div className="task-column">
      <h2>{category}</h2>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="task-list">
          {tasks.map((task) => (
            <SortableTask key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined, transition }}
      {...attributes}
      {...listeners}
      className="task-item"
    >
      <h3>{task.title}</h3>
    </div>
  );
}

export default App;
