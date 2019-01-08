const fs = require('fs');

let originalNote = {
    title: 'Some title',
    body: 'Some body'
};

fs.writeFileSync('notes.json', JSON.stringify(originalNote));

let noteString = fs.readFileSync('notes.json');
let note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);