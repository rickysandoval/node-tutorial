const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server.js');
const { Todo } = require('./../models/todo');

const mockTodos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    // Wipes them all and populates with dummy data
    Todo.remove({}).then(() => {
        return Todo.insertMany(mockTodos)
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text xoxo';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    // Do this so test properly fails
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create a todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body.errors).toExist();
            })
            .end((err, res) => {
                if (err) {
                    // Do this so test properly fails
                    return done(err);
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all toos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${mockTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(mockTodos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non ObjectIDs', (done) => {
        let invalidId = '123';
        request(app)
            .get(`/todos/${invalidId}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = mockTodos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((res) => {
                    expect(res).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return a 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non ObjectIDs', (done) => {
        let invalidId = '123';
        request(app)
            .delete(`/todos/${invalidId}`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        let hexId = mockTodos[0]._id.toHexString();
        let body = {
            text: 'New text',
            completed: true
        };
        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
            })
            .end((err, res) => {
                if (err) {
                    // Do this so test properly fails
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo.text).toBe(body.text);
                    expect(todo.completed).toBe(true);
                    expect(todo.completedAt).toBeA('number');
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should clear completed at when todo not completed', (done) => {
        let hexId = mockTodos[1]._id.toHexString();
        let body = {
            text: 'New text 2',
            completed: false
        };
        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(body.text);
            })
            .end((err, res) => {
                if (err) {
                    // Do this so test properly fails
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo.text).toBe(body.text);
                    expect(todo.completed).toBe(false);
                    expect(todo.completedAt).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });
}); 