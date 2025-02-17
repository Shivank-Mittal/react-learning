import { act, renderHook, cleanup } from "@testing-library/react";
import {
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  vi,
  MockInstance,
} from "vitest";
import useTodo from "../../project/todo/todoHook";
import { TODO } from "../../project/todo/todo";

describe("Todo hook", () => {
  test("should be empty", () => {
    const { result } = renderHook(useTodo);
    expect(result.current.todos.length).toBe(0);
  });
});

describe("Todo Hook crud", () => {
  let getItemSpy: MockInstance;
  let setItemSpy: MockInstance;

  beforeEach(() => {
    getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    getItemSpy.mockReturnValue(null);
  });

  afterEach(() => {
    cleanup();
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  test("should be able to add a todo", () => {
    const { result } = renderHook(useTodo);
    const todo = "test0";
    act(() => result.current.addTodo(todo));

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].value).toEqual(todo);
  });

  test("should be able to delete a todo", () => {
    const todo = "test1";
    const { result } = renderHook(useTodo);
    act(() => result.current.addTodo(todo));

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].value).toEqual(todo);

    act(() => result.current.deleteTodo(result.current.todos[0].id));
    expect(result.current.todos.length).toBe(0);
  });

  test("should be able to update todo", () => {
    const todo = "test2";
    const { result } = renderHook(useTodo);
    act(() => result.current.addTodo(todo));

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].value).toEqual(todo);

    const newTodo: TODO = { ...result.current.todos[0], value: "updatedTodo" };

    act(() => result.current.updateTodo(result.current.todos[0].id, newTodo));
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].value).toEqual("updatedTodo");
  });

  test("should be able to toggle complete", () => {
    const todo = "test2";
    const { result } = renderHook(useTodo);
    act(() => result.current.addTodo(todo));

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].value).toEqual(todo);

    act(() => result.current.toggleComplete(result.current.todos[0].id));
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].isCompleted).toEqual(true);

    act(() => result.current.toggleComplete(result.current.todos[0].id));
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].isCompleted).toEqual(false);
  });

  test("should be able to toggle editable", () => {
    const todo = "test2";
    const { result } = renderHook(useTodo);
    act(() => result.current.addTodo(todo));

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].value).toEqual(todo);

    act(() => result.current.toggleEditable(result.current.todos[0].id));
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].isTodoEditable).toEqual(true);

    act(() => result.current.toggleEditable(result.current.todos[0].id));
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].isTodoEditable).toEqual(false);
  });
});

describe("Todo Hook Local Storage", () => {
  let getItemSpy: MockInstance;
  let setItemSpy: MockInstance;

  beforeEach(() => {
    getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    getItemSpy.mockReturnValue(null);
  });

  afterEach(() => {
    cleanup();
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  test("should get todos from localStorage at initial render", () => {
    const { result } = renderHook(useTodo);
    expect(result.current.todos.length).toBe(0);

    expect(getItemSpy).toHaveBeenCalledExactlyOnceWith("todos");
  });

  test("should be able to save todos to localhost", () => {
    const todo = "test2";
    const { result } = renderHook(useTodo);
    act(() => result.current.addTodo(todo));

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].value).toEqual(todo);

    expect(setItemSpy).toHaveBeenCalledExactlyOnceWith(
      "todos",
      JSON.stringify([result.current.todos[0]]),
    );
  });
});
