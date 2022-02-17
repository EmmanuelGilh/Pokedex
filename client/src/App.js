import './App.css';
import { Routes, Route } from 'react-router-dom'
import Landing from './views/landing/Landing'
import DetailsPokes from './views/detailsPokes/DetailsPokes'
import Home from './views/home/Home';


function App() {
  return (
    <div className="App">

      <Routes>

        <Route path="/">

          <Route exact path="/" element={<Landing />} />

          <Route path="/pokemons" element={<Home />} />

          <Route path="/:id/details" element={<DetailsPokes />} />

        </Route>

      </Routes>

    </div>
  );
}

export default App;
