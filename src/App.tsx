import './assets/scss/main.scss';
import Header from './components/Header';
import TaskForm from './core/TaskForm';
import TaskList from './core/TaskList';
import { TaskProvider } from './providers/TaskProvider';
import "react-datepicker/dist/react-datepicker.css";


function App() {
  return (
    <div className='app'>
      <TaskProvider>
        <div className='d-flex flex-column h-100'>
          <div className='flex-grow-1'>
            <Header />
          </div>
          <div className='container flex-grow-1 p-3 h-100'>
            <div className='row h-100'>
              <div className="col-md-5 divider-right">
                <TaskForm />
              </div>
              <div className="col-md-7">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </TaskProvider>
    </div>

  )
}

export default App
