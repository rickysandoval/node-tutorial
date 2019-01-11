const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server.js');
const { Todo } = require('./../models/todo');


beforeEach((done) => {
    // Wipes them all
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    // Do this so test properly fails
                    return done(err);
                }

                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});