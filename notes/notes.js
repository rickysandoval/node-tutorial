const fs = require('fs');

let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let logNote = (note) => {
    debugger;
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };

   
    let duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

let getAll = () => {
    let notes = fetchNotes();
    return notes;
};

let getNote = (title) => {
    let notes = fetchNotes();
    let note = notes.find(note => note.title === title);
    return note;
};

let removeNote = (title) => {
    let notes = fetchNotes();
    let newNotes = notes.filter(note => note.title !== title);
    saveNotes(newNotes);
    return notes.length !== newNotes.length;
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};