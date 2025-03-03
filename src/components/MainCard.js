import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

//icons
//components
import Todo from "./Todo";

//Hooks
import { useContext, useState, useEffect } from "react";
import {TodoContext} from '../context/todoContext'
//others
import { v4 as uuidv4 } from "uuid"; //package to generate a unique id
//uuidv4 is the name i get to the package to can use it in the code and i can edit it

export default function MainCard() {
  //state
  let [titleInput, setTitleInput] = useState("");
  let {todos, setTodos} = useContext(TodoContext);
  let [typeOfTodos, setTypeOfTodos ] = useState("all");

  // filter todos
  let completedTodos = todos.filter((t)=>{
    return t.isCompleted
  }) ?? []

  let nonCompletedTodos = todos.filter((t)=>{
    return !t.isCompleted
  }) ?? []

  let TodoListToBeRender = todos;

  if(typeOfTodos === "non-completed"){
    TodoListToBeRender = nonCompletedTodos
  }else if(typeOfTodos === 'completed'){
    TodoListToBeRender = completedTodos
  }

  let todoList = TodoListToBeRender.map((todo) => {
    return (
        <Todo key={todo.id} todo={todo}/>
    );
  });

  //functions
  function handleInputChange(value) {
    setTitleInput(value);
  }
  function addNewTodo() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      body: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo]

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTitleInput("");
  }
  function handleChangeTypeOfTodos(e){
    setTypeOfTodos(e.target.value)
  }

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if(storedTodos){
      setTodos(storedTodos)
    }
  }, [])

  return (
<div>
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{maxHeight: '80vh', overflowY: 'auto'}}>
        <header style={{ textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h2"
            sx={{ color: "#222", marginBottom: "4px", fontWeight: "normal" }}
          >
            مهامي
          </Typography>
          <Divider />
          {/* toggle Button */}
          <ToggleButtonGroup
            color="primary"
            value={typeOfTodos}
            exclusive
            onChange={handleChangeTypeOfTodos}
            aria-label="Platform"
            sx={{ direction: "ltr", marginTop: " 25px" }}
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* ===toggle Button==== */}
        </header>
        <main>
          {/* todo list */}
          {todoList}
          {/* ====todo list==== */}
        </main>
        <footer style={{ marginTop: "25px" }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              {/* add input */}
              <TextField
                id="outlined-basic"
                label="عنوان مهمة"
                variant="outlined"
                className="input"
                value={titleInput}
                onChange={(e) => {
                  handleInputChange(e.target.value);
                }}
              />
              {/* ====add input==== */}
            </Grid>
            <Grid size={4}>
              <Button
                variant="contained"
                className="addBtn"
                onClick={addNewTodo}
                disabled={titleInput.length <= 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </footer>
      </CardContent>
    </Card>
</div>
  );
}
