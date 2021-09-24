const express = require('express');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose')
const Todo = require('./models/todo.model')

const app = express();
const router=express.Router();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true ,useUnifiedTopology: true});
const connection = mongoose.connection;

// Once the connection is established, callback
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

router.get('/', (req,res) => {
    Todo.find((err, todos) => {
        if(err)
            console.log(err);
        else {
            res.json(todos);
        }
    });
});

router.route('/:id').get((req,res) => {
    const id = req.params.id;
    Todo.findById(id, (err,todo) => {
        res.json(todo);
    });
});

router.route('/add').post((req,res) => {
    const todo = new Todo(req.body);
    todo.save()
        .then( todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch( err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/todos', router);

app.listen( PORT, () => {
    console.log("Server is running on port " + PORT);
})