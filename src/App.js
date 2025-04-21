import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position='top-right'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
