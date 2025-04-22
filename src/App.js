import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import AddEmployee from './pages/AddEmployee';
import View from './pages/View';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position='top-right'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addEmployee' element={<AddEmployee/>}/>
        <Route path='/editEmployee/:id' element={<AddEmployee/>}/>
        <Route path='/view/:id' element={<View/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
