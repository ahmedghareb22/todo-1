import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//hooks
import {useState} from 'react' 
import {TodoContext} from './context/todoContext'
//others
import { v4 as uuidv4 } from "uuid";

//components
import MainCard from "./components/MainCard";

//css
import "./App.css";

//theme
const theme = createTheme({
  typography:{
    fontFamily: ['Alexandria', '']
  },
  palette:{
    primary:{
      main: '#03a9f4',
    }
  },
  direction: "ltr"
});

//initialTodos
// let initialTodos = [
//   { id: uuidv4(), title: "اليوم", body: "اروح الجيم", isCompleted: false },
//   { id: uuidv4(), title: "اليوم", body: "اروح الجيم", isCompleted: false },
// ];

function App() {
  //state
  // let [todos, setTodos] = useState(initialTodos);
  let [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container maxWidth="sm">
          <TodoContext.Provider value={{todos, setTodos}}>
            <MainCard />
          </TodoContext.Provider>

        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

// {todos, setTodos} ===> {todos : todos, setTodos: setTodos} >> the same thing if the key and value are equal
