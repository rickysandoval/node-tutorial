

let asyncAdd = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1000);
    });
}

asyncAdd(1,'hey').then(result => {
    console.log('Success: ', result);
    return asyncAdd(result, 33);
}).then(result => {
    console.log('Success: ', result);
}).catch(errorMessage => {
    console.log('Error: ', errorMessage);
});

// let somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         Math.random() > .5 ? resolve('Hey. It worked!') : reject('Oh no, it failed :(');
//     }, 1000);
// });

// somePromise.then(message => {
//     console.log('Success: ', message);
// }, errorMessage => {
//     console.log('Error: ', errorMessage);
// })