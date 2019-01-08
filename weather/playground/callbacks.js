let getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Ricky'
    };
    setTimeout(() => callback(user), 3000);
};

getUser(1, (data) =>{
    console.log(data);
});