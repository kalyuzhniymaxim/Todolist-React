import React, { useState } from 'react';
import Todolist from './Todolist';
import { v1 } from 'uuid';
import './App.css';

export type FilterValuesType = 'all' | 'Completed' | 'Active';
type TodolistType = {
  id: string
  title:string
  filter:FilterValuesType
}



function App() {


  function changeFilter(value: FilterValuesType, todolistsId: string) {
    let todolist = todolists.find(tl => tl.id === todolistsId)
    if(todolist){
      todolist.filter = value;
      setTodolists([...todolists])

    }
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId]
    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean,todolistId: string) {
    let tasks = tasksObj[todoListId]
    let task = tasks.find((t) => {
      if (t.id === taskId) {
        return true;
      } else {
        return false;
      }
    });
    if (task) {
      task.isDone = isDone;
      tasksObj[todoListId]=[...tasks]
      setTasks({...tasksObj});
    }
    
  }


  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({...tasksObj});
  }

let todoListId = v1();
let todoListId1 = v1();
let todoListId2 = v1();

  let [todolists, setTodolists] =  useState <Array<TodolistType>>([
    { id: todoListId, title: 'What to learn', filter: 'Active' },
    { id: todoListId1, title: 'What to buy', filter: 'Completed' },
    { id: todoListId2, title: 'What to films', filter: 'Completed' },
  ]);
  
  let [tasksObj, setTasks] = useState({
    [todoListId]: [
      { id: v1(), title: 'Css', isDone: true },
      { id: v1(), title: 'Js', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'React', isDone: false }
    ],
    [todoListId1]: [
      { id: v1(), title: 'Css1', isDone: true },
      { id: v1(), title: 'Js', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'React', isDone: false }
    ],
    [todoListId2]: [
      { id: v1(), title: 'Css2', isDone: true },
      { id: v1(), title: 'Js', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'React', isDone: false }
    ],



  })
  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todoListId)
    setTodolists(filteredTodolist)
    delete tasksObj[todoListId]
    setTasks({...tasksObj})
  } 
  return (
    <div className="App">
      {todolists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id];
          if ('Completed' === tl.filter) {
            tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
          }
          if ('Active' === tl.filter) {
            tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
          }
        return (
          <Todolist
          key={tl.id}
          id ={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            result={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
