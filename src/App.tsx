import React,{FC,useState,ChangeEvent} from 'react';
import './App.css';
import TodoTask from './components/TodoTask';
import { ITask } from './interfaces';

const App: FC = () => {
  const [task,setTask] = useState<string>("");
  const [deadline,setDeadline] = useState<number>(0);
  const [list,setList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>):void =>{
    (event.target.name === "task") 
    ? setTask(event.target.value) 
    : setDeadline(Number(event.target.value))
  };
  const addTask = ():void => {
    const newTask = {taskName:task, deadline:deadline}
    setList([...list,newTask]);
    setTask("");
    setDeadline(0);
  };
  const completeTask = (deleteTask: string):void => {
    setList(list.filter((task)=>{
      return task.taskName !== deleteTask
    }))
  };

  return (
    <div className="App">
      <div className="header">
        <div className='inputContainer'>
          <input 
            type="text" 
            placeholder='Input Task'
            name='task'
            value={task}
            onChange={handleChange}
          />
          <input 
            type="number" 
            placeholder='Deadline (days)'
            name='deadline'
            min="1"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={addTask}
        >Add Task</button>
      </div>
      <div className="list" >
        {list.map((task: ITask,key: number)=>{
          return <TodoTask key={key} task={task} completeTask={completeTask}/>
        })}
      </div>
    </div>
  );
}

export default App;
