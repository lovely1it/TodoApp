const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Todo = require('./../models/todo')

Router.get('/api', async (req, res) =>{
    let todos = await Todo.find({});
    res.send(todos);
 });
 
 Router.post('/api', async (req, res) => {
     const { text } = req.body;
     const todo = new Todo({ text});
     try{
         todo.save();
         res.send(todo);
     }catch(err){
         res.send( 400, err);
     }
 });
 
 Router.put('/api/:id', async (req, res) =>{
     const todo = await Todo.findById( req.params.id );
     for( key in req.body ){
         if(todo[key] != req.body[key]){
             todo[key] = req.body[key];
         }
     }
     try{
         todo.save();
         res.send(todo);
     }catch(err){
         res.send(400,err);
     }
 });
 
 Router.delete('/api/:id', async (req, res) => {
     const todo = await Todo.findById(req.params.id);
     try{
         todo.remove();
         res.send("message: Todo has been deleted successfully!");
     
     }catch(err){
         res.send(400, err);
     }
 });

 module.exports = Router;
 