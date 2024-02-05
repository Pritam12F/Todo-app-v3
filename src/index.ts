import express from "express"
import cors from 'cors'
import SignupRouter from './routes/singup'
import AddTodo from './routes/addtodo'
import GetTodo from './routes/gettodos'

const app = express()
app.use(express.json())
app.use(cors())

app.use("/signup", SignupRouter)
app.use("/addtodo", AddTodo)
app.use("/gettodos", GetTodo)

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
});