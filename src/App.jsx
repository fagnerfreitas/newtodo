import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import style from './app.module.scss';

import clipboard from './icons/clipboard.svg';
import rocket from './icons/rocket.svg';

import Task from './components/Task';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [tasks, setTask] = useState([]);
  const [taskscompleted, setTaskscompleted] = useState(0);

  const handleInput = (text) => {
    setInputValue(text);
  }

  const handlerAddTask = () => {


    if (inputValue != '') {
      setTask([...tasks, {
        id:uuidv4(),
        text: inputValue,
        completed: false
      }])
  
      setInputValue('');
    }
  }

  const handleCompleted = (param) => {

    let aux = tasks.map((task, key) => {
      if (task.id == param) {
        return {
          id:task.id,
          text: task.text,
          completed: !task.completed
        };
      } else {
        return task
      };

    });

    setTask(aux);
  }

  const handleRemove = (param) => {

    const aux = tasks.filter((task) => {
      return task.id !== param
    })

    setTask(aux);
  }

  useEffect(() => {

    const aux = tasks.filter((task) => {
      return task.completed === true
    })


    setTaskscompleted(aux.length);

  }, [tasks])

  return (
    <div className={style.container}>
      <header className={style.header}>
        <img src={rocket} />
        <h1 className={style.title}>to<strong>do</strong></h1>
      </header>
      <div className={style.body}>
        <div className={style.containerForm}>
          <input onChange={(e) => handleInput(e.target.value)} value={inputValue} placeholder="Adicione uma nova tarefa" /> <button onClick={handlerAddTask}><strong>Criar</strong> <span className="material-symbols-outlined">
            add_circle
        </span></button>
        </div>
        <div className={style.containerList}>
          <header>
            <div className={style.taskCreate}>
              <p>Tarefas criadas</p>  <span>{tasks.length}</span>
            </div>
            <div className={style.taskCompleted}>
              <p>Concluídas</p>  <span>{taskscompleted} de {tasks.length}</span>
            </div>
          </header>
          <div className={style.line} />
          <div className={style.bodyList}>

            {tasks.length == 0

              ? <>
                <img src={clipboard} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </>

              : <>

                {tasks.map((task, key) => (
                  <Task key={task.id} data={task} handleCompleted={() => handleCompleted(task.id)} handleRemove={() => handleRemove(task.id)} />
                ))}

              </>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
