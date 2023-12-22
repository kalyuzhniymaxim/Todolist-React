import { ChangeEvent, useState, KeyboardEvent } from 'react';
import React from 'react';
import { FilterValuesType } from './App';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  result: any;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

function Todolist(props: PropsType) {
  const [newTitle, setNewTitle] = useState('');
  const [checked, setChecked] = useState(false);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(newTitle);
      setNewTitle('');
    }
  };

  const addTaskf = () => {
    props.addTask(newTitle);
    setNewTitle('');
  };
  const onClickFilterAll = () => {
    props.changeFilter('all');
  };
  const onClickFilterActive = () => {
    props.changeFilter('Active');
  };
  const onClickFilterCompleted = () => {
    props.changeFilter('Completed');
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTitle} onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler} />
        <button onClick={addTaskf}>+</button>
      </div>
      <ul>
        {props.tasks.map((link, i) => (
          <li key={link.id}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                console.log(e);
              }}
            />
            <span>{link.title}</span>
            <button
              onClick={() => {
                props.result(link.id);
              }}>
              X
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={onClickFilterAll}>All</button>
        <button onClick={onClickFilterActive}>Active</button>
        <button onClick={onClickFilterCompleted}>Completed</button>
      </div>
    </div>
  );
}

export default Todolist;
