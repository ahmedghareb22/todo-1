import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
//dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//components

//Hooks
import {useContext, useState } from 'react'
import {TodoContext} from '../context/todoContext'


function Todo({todo}) {
  let {todos, setTodos} = useContext(TodoContext)
  let [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  let [openEditDialog, setOpenEditDialog] = useState(false)
  // let [inputs, setInputs] = useState({title: '', body: ''})==> the same thing but now its better bec i don't have to edit the initial values
  let [inputs, setInputs] = useState({title: todo.title, body: todo.body})

  //event handlers
  function handleCheckButton() {
    const newTodos = todos.map((t)=>{
      if(t.id === todo.id){
        t.isCompleted = !t.isCompleted;
        return t
      }else{
        return t
      }
    }) 
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }
  //dialog
  function handleDeleteDialogClose(){
    setOpenDeleteDialog(false)
  }
  function handleDeleteDialog (){
    setOpenDeleteDialog(true)
  }
  function handleDeleteTodo (){
    let newTodos = todos.filter((t)=>{
      return t.id !== todo.id
    })
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }
  function handleEditDialog (){
    setOpenEditDialog(true)
    // setInputs({title: todo.title, body: todo.body})
    //i can but the initial values in the state before
  }
  function handleEditDialogClose(){
    setOpenEditDialog(false)
  }
  function handleEditTodo (){
    let newTodos = todos.map((t)=>{
      if(t.id === todo.id){
        // t.title = inputs.title;
        // t.body = inputs.body;
        // return t
        return {...t, title: inputs.title, body: inputs.body}
      }else{
        return t
      }
    })
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
    setOpenEditDialog(false)
  }
  //====dialog=====

  return (
<>
      <Card className="todo">
        <CardContent>
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid size={8}>
              <Typography variant="h5" sx={{marginBottom: '5px', textDecoration: todo.isCompleted?'line-through': 'none '}}>{todo.title}</Typography>
              <Typography variant="body1">{todo.body}</Typography>
            </Grid>
            <Grid size={4}>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <IconButton className={todo.isCompleted? "todoBtn check done": "todoBtn check"} onClick={handleCheckButton}>
                    <CheckIcon />
                  </IconButton>
                </Grid>
                <Grid size={4}>
                  <IconButton className="todoBtn edit" onClick={handleEditDialog}>
                    <EditOutlinedIcon />
                  </IconButton>
                </Grid>
                <Grid size={4}>
                  <IconButton className="todoBtn delete" onClick={handleDeleteDialog}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* delete dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button onClick={handleDeleteTodo} autoFocus>
            تاكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===delete dialog=== */}

      {/* Edit dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          تعديل المهمة
        </DialogTitle>
        <DialogContent sx={{paddingTop: '10px !important'}}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="عنوان مهمة"
            variant="outlined"
            value={inputs.title}
            onChange={(e)=>{
              setInputs({...inputs, title: e.target.value})
            }}
          />
          <TextField
            sx={{width: '100%', marginTop: '25px'}}
            id="outlined-basic"
            label="تفاصيل مهمة"
            variant="outlined"
            value={inputs.body}
            onChange={(e)=>{
              setInputs({...inputs, body: e.target.value})
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>اغلاق</Button>
          <Button onClick={handleEditTodo} autoFocus>
          تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===Edit dialog=== */}
</>
  );
}
export default Todo;
