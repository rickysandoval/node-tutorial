console.log('Starting app');

setTimeout(() => {
    console.log('Inside of timeout');
}, 2000);

setTimeout(() => {
    console.log('Zero delay');
}, 0);

console.log('Finishing up');