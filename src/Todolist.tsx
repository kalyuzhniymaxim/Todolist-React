import { ChangeEvent, useState, KeyboardEvent } from 'react';
import React from 'react';
import { FilterValuesType } from './App';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  result: any;
  changeFilter: (value: FilterValuesType, todolistsId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus:(taskId: string, isDone: boolean, todoListId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
};

function Todolist(props: PropsType) {
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState<string | null>(null);


  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      props.addTask(newTitle, props.id);
      setNewTitle('');
    }
  };

  const addTaskf = () => {
    if(newTitle.trim() !== ''){
      props.addTask(newTitle.trim(), props.id);
      setNewTitle('')
    }else{
      setError('title is required')
    }
;
  };
  const onClickFilterAll = () => {
    props.changeFilter('all', props.id);
  };
  const onClickFilterActive = () => {
    props.changeFilter('Active', props.id);
  };
  const onClickFilterCompleted = () => {
    props.changeFilter('Completed', props.id);
  };
  const remuveTodolist = () => {
props.removeTodolist(props.id)
  }
  return (
    <div>
      <h3>{props.title}</h3><button onClick={remuveTodolist}>X</button>
      <div>
        <input className={error ? 'error' : ''} value={newTitle} onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler} />
        <button onClick={addTaskf}>+</button>
        { error && <div className='error-message'>{error} </div>}
      </div>
      <ul>
        {props.tasks.map((link, i) => (
          <li className={link.isDone ? 'is-done' :''} key={link.id}>
            <input
              type="checkbox"
              
              checked={link.isDone}
              onChange={(e:ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(link.id, e.currentTarget.checked, props.id);
              }}
            />
            <span>{link.title}</span>
            <button
              onClick={() => {
                props.result(link.id, props.id);
              }}>
              X
            </button>
            
          </li>
        ))}
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' :''} onClick={onClickFilterAll}>All</button>
        <button className={props.filter === 'Active' ? 'active-filter' :''} onClick={onClickFilterActive}>Active</button>
        <button className={props.filter === 'Completed' ? 'active-filter' :''} onClick={onClickFilterCompleted}>Completed</button>
      </div>
    </div>
  );
}

export default Todolist;
