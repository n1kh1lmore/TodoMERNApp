const Todo = ('../models/todo.model');

const todo = new Todo(req.body);
    todo.save()
        .then( todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch( err => {
            res.status(400).send('adding new todo failed');
        });