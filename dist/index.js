"use strict";
// Part A - System: Simple Notes Management System(7 Marks)
// Q >> 1,5
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    set age(value) {
        if (value < 18 || value > 60) {
            throw new Error("age must be between 18 and 60.");
        }
        this._age = value;
    }
    get age() {
        return this._age;
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
        console.log(`notebook "${notebook.name}" added from ${this.name}`);
    }
    removeNotebook(notebookName) {
        this.notebooks = this.notebooks.filter((nb) => nb.name !== notebookName);
        console.log(`notebook "${notebookName}" removed from ${this.name}`);
    }
    listNotebooks() {
        console.log(`${this.name} notebooks (${this.notebooks.length})`);
        if (this.notebooks.length === 0) {
            console.log("no notebooks found");
            return;
        }
        this.notebooks.forEach((nb, index) => {
            console.log(`${index + 1}. ${nb.name}`);
        });
    }
    displayInfo() {
        console.log(`Id: ${this.id} , name: ${this.name} , email: ${this.email} , phone: ${this.phone} , age: ${this._age}`);
    }
}
// Q >> 2
class Admin extends User {
    role = "admin";
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes(action, noteTitle) {
        console.log(`admin [${this.name}] (Id: ${this.id}) action '${action}' on note: "${noteTitle}"`);
    }
}
//Q >> 3,6
class Note {
    id;
    title;
    content;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    preview() {
        if (this.content.length <= 20) {
            return this.content;
        }
        return this.content.slice(0, 20);
    }
    getAuthorDetails() {
        return `note "${this.title}" created by ${this.author.name} (${this.author.email})`;
    }
}
// Q >> 4
class NoteBook {
    name;
    notes = [];
    constructor(name) {
        this.name = name;
    }
    addNote(id, title, content, author) {
        const newNote = new Note(id, title, content, author);
        this.notes.push(newNote);
        console.log(`note "${title}" added to "${this.name}"`);
        return newNote;
    }
    removeNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId);
        console.log(`note with Id ${noteId} removed from "${this.name}"`);
    }
    getAllNotes() {
        console.log(`notes in ${this.name}`);
        this.notes.forEach((note) => {
            console.log(`${note.id} - ${note.title}: ${note.preview()} by ${note.author.name}`);
        });
    }
}
// Q >> 7
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
    getAllItems() {
        return [...this.items];
    }
}
//# sourceMappingURL=index.js.map