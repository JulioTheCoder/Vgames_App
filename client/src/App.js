import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Home from './components/Home';
import { VideogameCreate } from './components/VideogameCreate';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component= {Landing}/>
          <Route path={"/home/:id"} component={Detail}/>
          <Route path={"/home"} component={Home}/>
          <Route path={"/videogame"} component={VideogameCreate}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
