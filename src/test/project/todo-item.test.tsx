import { render } from "@testing-library/react";
import TodoItem from "../../project/todo/Todo_Item";
import { TODO } from "../../project/todo/todo";
import { describe, expect, test } from "vitest";

describe("todo-item", () => {
  const todo: TODO = {
    id: 1,
    value: "test todo",
    isCompleted: false,
    isTodoEditable: false,
  };

  test("renders", () => {
    const todoContainer = render(<TodoItem {...todo}></TodoItem>);
    expect(todoContainer.container).toBeInTheDocument();
  });
});
