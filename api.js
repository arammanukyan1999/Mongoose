const { Router } = require('express');

const Todo = require('./Todo')

const routes = Router();

routes.get('/todos', function(req, res) {
    Todo.find({}, function(err, todo) {
       res.json(todo);
    });
});

routes.delete('/todos/:id' ,(req,res) =>{
    const {id} = req.params;
    Todo.remove({_id : id}, function(err){
        if (err) return res.status(400).end();
        return res.status(200);
    })
   
    res.end()
}

);
routes.post('/todos', (req,res) =>{
    let todoitem = { todo: req.body.todo }
    if (req.body.todo != ''){
        return Todo.create(todoitem, function(err,todo){
            if (err) return res.status(400).end();
            return res.status(201).json(todo);
        })    
    }  
    return res.status(400).end()
}); 

routes.put('/todos/:id',(req,res) => {
    const { id } = req.params;
   return Todo.findByIdAndUpdate(id, {$set:{todo:req.body.todo}}, {new:true}, function(err,todo){
        if (err) return res.status(400).end();
        return res.status(201).json(todo);
        
    })
    return res.status(400).end()

}
)



module.exports = routes;