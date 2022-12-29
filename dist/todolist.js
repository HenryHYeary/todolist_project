"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Todo = require('./todo');
var TodoList = /*#__PURE__*/function () {
  function TodoList(title) {
    _classCallCheck(this, TodoList);
    this.title = title;
    this.todos = [];
  }
  _createClass(TodoList, [{
    key: "add",
    value: function add(todo) {
      if (!(todo instanceof Todo)) {
        throw new TypeError('can only add Todo objects');
      } else {
        this.todos.push(todo);
      }
    }
  }, {
    key: "size",
    value: function size() {
      return this.todos.length;
    }
  }, {
    key: "first",
    value: function first() {
      return this.todos[0];
    }
  }, {
    key: "last",
    value: function last() {
      return this.todos[this.size() - 1];
    }
  }, {
    key: "itemAt",
    value: function itemAt(index) {
      this._validateIndex(index);
      return this.todos[index];
    }
  }, {
    key: "markDoneAt",
    value: function markDoneAt(index) {
      this.itemAt(index).markDone();
    }
  }, {
    key: "markUndoneAt",
    value: function markUndoneAt(index) {
      this.itemAt(index).markUndone();
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return this.todos.every(function (todo) {
        return todo.isDone();
      });
    }
  }, {
    key: "shift",
    value: function shift() {
      return this.todos.shift();
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.todos.pop();
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      if (this.itemAt(index)) this.todos.splice(index, 1);
    }
  }, {
    key: "toString",
    value: function toString() {
      var title = "---- ".concat(this.title, " ----");
      var list = this.todos.map(function (todo) {
        return todo.toString();
      }).join("\n");
      return "".concat(title, "\n").concat(list);
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var index = 0; index < this.todos.length; index++) {
        callback(this.todos[index]);
      }
    }
  }, {
    key: "filter",
    value: function filter(callback) {
      var resultTodoList = new TodoList(this.title);
      this.forEach(function (todo) {
        if (callback(todo)) {
          resultTodoList.add(todo);
        }
      });
      return resultTodoList;
    }
  }, {
    key: "allDone",
    value: function allDone() {
      return this.filter(function (todo) {
        return todo.isDone();
      });
    }
  }, {
    key: "allNotDone",
    value: function allNotDone() {
      return this.filter(function (todo) {
        return !todo.isDone();
      });
    }
  }, {
    key: "findByTitle",
    value: function findByTitle(title) {
      return this.filter(function (todo) {
        return todo.getTitle() === title;
      }).first();
    }
  }, {
    key: "markDone",
    value: function markDone(title) {
      var todo = this.findByTitle(title).markDone();
      if (todo !== undefined) {
        todo.markDone();
      }
    }
  }, {
    key: "markAllDone",
    value: function markAllDone() {
      this.forEach(function (todo) {
        return todo.markDone();
      });
    }
  }, {
    key: "markAllUndone",
    value: function markAllUndone() {
      this.forEach(function (todo) {
        return todo.markUndone();
      });
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.todos.slice();
    }
  }, {
    key: "_validateIndex",
    value: function _validateIndex(index) {
      if (!(index in this.todos)) {
        throw new ReferenceError("invalid index: ".concat(index));
      }
    }
  }]);
  return TodoList;
}();
module.exports = TodoList;