const request = require('supertest');
const express = require('express');

const app = require('./server.js').app;

it('should return hello world response', (done) => {
    request(app)
        .get('/')
        .expect('Hello world!')
        .end(done);
});