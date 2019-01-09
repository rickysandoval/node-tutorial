const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {

    // Common syntax for method
    describe('#add', () => {
        it('should add two numbers', () => {
            let res = utils.add(33, 11);

            expect(res).toBe(44).toBeA('number');
        });
    });


    it('should async add two numbers', (done) => {
        utils.asyncAdd(4, 3, (sum) => {
            expect(sum).toBe(7).toBeA('number');
            done();
        });
    });

    it('should square a number', () => {
        let res = utils.square(9);

        expect(res).toBe(81).toBeA('number');
    });

    it('should set first and last names', () => {
        let user = {
            age: 26,
            location: 'Denver'
        };

        let res = utils.setName(user, 'Ricky Sandoval');

        expect(res).toInclude({
            firstName: 'Ricky',
            lastName: 'Sandoval'
        }).toBeA('object');

        // expect(user).toBe(res);
    });
});


// it('should expect some values', () => {
//     // expect(12).toNotBe(11);
//     // expect({name: 'Andrew'}).toEqual({name: 'Andrew'});
//     // expect([1,4,2]).toInclude(4);
//     expect({
//         name: 'Andrew',
//         age: 25
//     }).toInclude({
//         age: 25
//     });
// });