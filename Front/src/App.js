import './App.css';
import Login from './components/Login/Login';
import OverView from './components/OverView/OverView';
import { Route, Routes } from "react-router-dom";
import Role from './components/Role/Role';
import UsersView from './components/AllUsers/UsersView';
import Company from './components/Company/Company';
import Permission from './components/Permission/Permission';
import Scoring from '../src/components/Scoring/Scoring';
import Chart from '../src/components/chart/chart';
import Image_problemme from '../src/components/Image_problemme/Image_problemme'
import ereur from './components/ereur';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Login} />
        
        <Route path='/home' Component={OverView}>
          <Route path='' Component={UsersView}/>
          <Route path='role' Component={Role}/>
          <Route path='404' Component={ereur} />
          <Route path='company' Component={Company}/>
          <Route path='permission' Component={Permission}/>
          <Route path='scoring' Component={Scoring}/>
          <Route path='chart' Component={Chart}/>
          <Route path='image_problemme' Component={Image_problemme}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
