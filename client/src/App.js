import './App.css';
import Register from './pages/register/Register';
import Transactions from './pages/transactions/Transactions';
import Dashboard from './pages/dashboard/Dashboard';
import ReactDOM from "react-dom/client";
import Home from './pages/home/Home';
import EmpLogin from './pages/emplogin/EmpLogin';
import About from './pages/about/About';
import EmpReg from './pages/empreg/EmpReg';
import Navbar from './components/navbar/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/emplogin' element={<EmpLogin />}></Route>
          <Route exact path='/emplogin' element={<EmpLogin />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
          <Route exact path='/transactions' element={<Transactions />}></Route>
          <Route exact path='/dashboard' element={<Dashboard />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/empreg' element={<EmpReg />}></Route>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
