const Todo = require('./todo');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError('can only add Todo objects');
    } else {
      this.todos.push(todo);
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone())
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    if (this.itemAt(index)) this.todos.splice(index, 1);
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(callback) {
    for (let index = 0; index < this.todos.length; index++) {
      callback(this.todos[index]);
    }
  }

  filter(callback) {
    let resultTodoList = new TodoList(this.title);

    this.forEach(todo => {
      if (callback(todo)) {
        resultTodoList.add(todo);
      }
    });

    return resultTodoList;
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  markDone(title) {
    let todo = this.findByTitle(title).markDone();
    if (todo !== undefined) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
}

module.exports = TodoList;