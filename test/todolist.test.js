const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray method returns an array copy of the list', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first object in the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last object in the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes and returns the first item in the list', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.size()).toBe(2);
  });

  test('calling pop removes and returns the last item in the list', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.size()).toBe(2);
  });

  test('TypeError is thrown when you attempt to add a non Todo object to list', () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('Monday')).toThrow(TypeError);
    expect(() => list.add(new TodoList).toThrow(TypeError));
  });

  test('ReferenceError is thrown when you call itemAt with an index with no element', () => {
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test('arks an item done. Raises ReferenceError if invalid index', () => {
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);

    list.markDoneAt(2);
    expect(todo3.isDone()).toBe(true);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
  });

  test('markUndoneAt marks an item undone. Throws ReferenceError if invalid index', () => {
    expect(() => list.markUndoneAt(4)).toThrow(ReferenceError);

    list.markDoneAt(2);
    list.markUndoneAt(2);
    expect(todo3.isDone()).toBe(false);
  });

  test('markAllDone marks every todo as done', () => {
    list.markAllDone();

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
  })

  test('removeAt removes an item, or raises a ReferenceError if invalid index', () => {
    expect(() => list.removeAt(7)).toThrow(ReferenceError);

    list.removeAt(2);
    expect(list.size()).toBe(2);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  
    expect(list.toString()).toBe(string);
  });

  test('toString returns correct string representation after a todo has been marked as done', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;

    list.markDoneAt(1);
    expect(list.toString()).toBe(string);
  });

  test('toString returns correct string representation when all todos are done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over all elements in the list', () => {
    list.forEach(todo => todo.iterated = true);

    expect(todo1.iterated).toBe(true);
    expect(todo2.iterated).toBe(true);
    expect(todo3.iterated).toBe(true);
  });
  
  test('filter returns a new TodoList object based on the truthiness of the callback', () => {
    list.markDoneAt(0);
    list.markDoneAt(1);

    let comparisonList = new TodoList("Today's Todos");

    comparisonList.add(todo1);
    comparisonList.add(todo2);

    let filteredList = list.filter(todo => todo.isDone());

    expect(filteredList).toEqual(comparisonList);
  });

  test('isDone verifies that every todo in the list is marked done', () => {
    list.markAllDone();

    expect(list.isDone()).toBe(true);
  });

  test('allDone returns a new TodoList object that contains all completed todos', () => {
    list.markDoneAt(0);
    list.markDoneAt(2);

    let comparisonList = new TodoList("Today's Todos");
    comparisonList.add(todo1);
    comparisonList.add(todo3);

    expect(list.allDone()).toEqual(comparisonList);
  });
});