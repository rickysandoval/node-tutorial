console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

let titleArgOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
let bodyArgOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleArgOptions,
        body: bodyArgOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleArgOptions
    })
    .command('remove', 'Remove a note', {
        title: titleArgOptions
    })
    .help()
    .argv;
let command = argv._[0];
console.log('Yargs: ', argv);

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note added');
        notes.logNote(note);
    } else {
        console.log('Note title already in use');
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(notes.logNote);
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note)
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    let success = notes.removeNote(argv.title);
    console.log(success ? 'Note removed' : 'No note found');
} else {
    console.log('Command not recognized');
}