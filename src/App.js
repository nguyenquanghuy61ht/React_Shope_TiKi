import Header from './component/Header';
import { Routes, Route } from "react-router-dom";
import Todo from './Features/Todo';
import Album from './Features/Album';
import Home from './Features/Home';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/albums" element={<Album />} />
      </Routes>
    </div>
  );
}

export default App;
