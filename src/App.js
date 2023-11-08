import Authors from "./components/Authors";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Author from "./components/Author";
import NewAuthor from "./components/NewAuthor";

function App() {
  return (
    <div className="container mt-5">
      <header>
        <nav className="header-nav">
          <a className="header-title" href="/">MyLibrary</a>
          <ul>
            <li><a href="/authors">Authors</a></li>
            <li><a href="/authors/new">New Author</a></li>
            <li><a href="/books">Books</a></li>
            <li><a href="/books/new">New Book</a></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='/authors' element={<Authors />}></Route>
        <Route path='/authors/:id' element={<Author />}></Route>
        <Route path='/authors/new' element={<NewAuthor />}></Route>
      </Routes>
    </div>
  );
}

export default App;
