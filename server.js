const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"20011112",
    database:"user"
})

db.connect(err => {
    if(err){
        console.log("Connection Failed")
    }else{
        console.log("Connection Success")
        app.listen(3001,()=>{
            console.log("Server started")
        }
    )
    }
}
)

app.post("/",async(req,res)=>{
    const { name , city } = req.body
    const sql = "INSERT INTO user (name,city) VALUES (?,?)"
    db.query(sql,[name,city],(err,result) => {
        if(err){
            console.error(err)
            res.status(500).send("Error")
        }else{
            console.log(result)
            res.status(200).json(result)
        }
    })
})

app.put("/",async(req,res)=>{
    const { id , city } = req.body
    const sql = "UPDATE user SET city = ? WHERE id = ?"
    db.query(sql,[city,id],(err,result) => {
        if(err){
            console.error(err)
            res.status(500).send("Error")
        }else{
            console.log(result)
            res.status(200).json(result)
        }
    })
})

app.delete("/",async(req,res)=>{
    const { id } = req.body
    const sql = "DELETE FROM user WHERE id = ?"
    db.query(sql,[id],(err,result) => {
        if(err){
            console.error(err)
            res.status(500).send("Error")
        }else{
            console.log(result)
            res.status(200).json(result)
        }
    })
})

app.get("/",async(req,res)=>{
    const sql = "SELECT * FROM user"
    db.query(sql,(err,result) => {
        if(err){
            console.error(err)
            res.status(500).send("Error")
        }else{
            console.log(result)
            res.status(200).json(result)
        }
    })
})