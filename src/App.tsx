import React, { useState } from 'react';
import Todolist from './Todolist';
import { v1 } from 'uuid';
import './App.css';

export type FilterValuesType = 'all' | 'Completed' | 'Active';

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: 'Css', isDone: true },
    { id: v1(), title: 'Js', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'React', isDone: false },
  ]);
  console.log(tasks)
  let [filter, setFilter] = useState<FilterValuesType>('all');

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function addTask(title: string){
    let newTask = { id: v1(), title: title, isDone: false};
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  let tasksForTodolist = tasks;
  if ('Completed' === filter) {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if ('Active' === filter) {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }


  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        result={removeTask}
        changeFilter={changeFilter}
        addTask = {addTask}
      />
    </div>
  );
}

export default App;
