// Part A - System: Simple Notes Management System(7 Marks)
// Q >> 1,5

class User {
  protected readonly id: number;
  public name: string;
  public email: string;
  private password: string;
  public phone: string;
  private _age!: number;
  private notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  public set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("age must be between 18 and 60.");
    }
    this._age = value;
  }

  public get age(): number {
    return this._age;
  }

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
    console.log(`notebook "${notebook.name}" added from ${this.name}`);
  }

  public removeNotebook(notebookName: string): void {
    this.notebooks = this.notebooks.filter((nb) => nb.name !== notebookName);
    console.log(`notebook "${notebookName}" removed from ${this.name}`);
  }

  public listNotebooks(): void {
    console.log(`${this.name} notebooks (${this.notebooks.length})`);
    if (this.notebooks.length === 0) {
      console.log("no notebooks found");
      return;
    }
    this.notebooks.forEach((nb, index) => {
      console.log(`${index + 1}. ${nb.name}`);
    });
  }
  public displayInfo(): void {
    console.log(
      `Id: ${this.id} , name: ${this.name} , email: ${this.email} , phone: ${this.phone} , age: ${this._age}`,
    );
  }
}

// Q >> 2
class Admin extends User {
  public role: string = "admin";

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    super(id, name, email, password, phone, age);
  }

  public manageNotes(
    action: "add" | "edit" | "delete",
    noteTitle: string,
  ): void {
    console.log(
      `admin [${this.name}] (Id: ${this.id}) action '${action}' on note: "${noteTitle}"`,
    );
  }
}

//Q >> 3,6

class Note {
  public readonly id: number;
  public title: string;
  public content: string;
  public author: User;

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  public preview(): string {
    if (this.content.length <= 20) {
      return this.content;
    }
    return this.content.slice(0, 20);
  }

  public getAuthorDetails(): string {
    return `note "${this.title}" created by ${this.author.name} (${this.author.email})`;
  }
}

// Q >> 4

class NoteBook {
  private notes: Note[] = [];

  constructor(public name: string) {}
  public addNote(
    id: number,
    title: string,
    content: string,
    author: User,
  ): Note {
    const newNote = new Note(id, title, content, author);
    this.notes.push(newNote);
    console.log(`note "${title}" added to "${this.name}"`);
    return newNote;
  }

  public removeNote(noteId: number): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
    console.log(`note with Id ${noteId} removed from "${this.name}"`);
  }

  public getAllNotes(): void {
    console.log(`notes in ${this.name}`);
    this.notes.forEach((note) => {
      console.log(
        `${note.id} - ${note.title}: ${note.preview()} by ${note.author.name}`,
      );
    });
  }
}

// Q >> 7

class Storage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  public getAllItems(): T[] {
    return [...this.items];
  }
}

