import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  handleDeleteTodo:(todoId: number) => void,
  deletingTodosIds: number[]
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  handleDeleteTodo,
  deletingTodosIds,
}) => {
  const [deletedTodoId, setdeletedTodoId] = useState(0);
  const { title, completed, id } = todo;

  const deleteTodo = useCallback((todoId: number) => {
    handleDeleteTodo(todoId);
    setdeletedTodoId(todoId);
  }, []);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo',
        { completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={() => deleteTodo(id)}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={classNames(
          'modal overlay',
          {
            'is-active': id === deletedTodoId
              || deletingTodosIds.includes(id),
          },
        )}
      >
        <div
          className="modal-background has-background-white-ter"
        />
        <div className="loader" />
      </div>
    </div>
  );
};