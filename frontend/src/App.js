import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Games from './Pages/Games';
import Add from './Pages/Add';

import './sass/App.scss'
import { useState } from 'react';

function App() {
  const [formView, setFormView] = useState("add");
  
  return (
    <div className="App">
      <h1>Game Wishlist Creator</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Add />} />
        </Routes>
      <Games setForm={setFormView} />
      </BrowserRouter>
    </div>
  );
}

export default App;
