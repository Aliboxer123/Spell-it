import '../App.css';
import Intro from './Intro';
import Game from './Game';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
    return (<Router>
       <Routes> 
            <Route path='/' Component={Intro} />
            <Route path='/game' Component={Game} />
       </Routes>    
     </Router>)   
}

export default App;
