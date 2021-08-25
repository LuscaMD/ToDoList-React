// ele serve para poder usar a sintaxe JSX
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// para importar css no React
import './App.css';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Header from './components/Header';
import TaskDetails from './components/TaskDetails';



const App = () => {

  // para usar javascript dentro do HTML deve abrir chaves: {}
  // as classes do css devem ser chamadas através do 'className' e não do class
  
  // state é o estado de uma coisa, uma váriavel só atualiza se for por meio do state
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Estudar programação',
      completed: false,
    },
    {
      id: '2',
      title: 'Ler livros',
      completed: true,
    }
  ]);

  useEffect(() => {

    const fetchTasks = async () => {

      const {data} = await axios.get('https://jsonplaceholder.cypress.io/todos?_limite=10')
      setTasks(data);
    };


    fetchTasks();
  }, []);

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {return {... task, completed: !task.completed}};

      return task;
    });

    setTasks(newTasks);
  }

  const handleTaskAddition = (taskTitle) => {
      // o "..." significa algo como, tudo que ja estava nas tasks
      const newTasks = [... tasks, {
        title: taskTitle,
        id: uuidv4(),
        completed: false,
      }];

      setTasks(newTasks)
  }

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);


    setTasks(newTasks);
  }

  return (
    // para retornar o componente todo, o codigo deve estar entre uma div vazia (<div></div>) ou uma tag vazia (<> </>)
    <Router>
      {/* sempre que um state for atualizado, o componente é renderizado novamente */}
      <div className="container">
        <Header />
        <Route path="/" exact render={() => (
          <>
            <AddTask handleTaskAddition={handleTaskAddition}  />
            {/* vai receber dados de um componente pai (isso se chama 'props') */}
            <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskDeletion={handleTaskDeletion} />
          </>
        )} />
        <Route path='/:taskTitle' exact component={TaskDetails} />
      </div>
    </Router>
  );
};

// serve para a index poder importar o componente 'App'
export default App;