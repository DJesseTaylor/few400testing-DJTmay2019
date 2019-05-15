import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { TodoListItem } from '../models';
import { tassign } from 'tassign';
import * as actions from '../actions/list.actions';

export interface TodoEntity {
  id: string;
  description: string;
}

export interface State extends EntityState<TodoEntity> {
  completedIds: string[];
}

const initialState: State = {
  ids: ['1', '2'],
  entities: {
    1: { id: '1', description: 'Clean Garage' },
    2: { id: '2', description: 'Finish Darly\'s Deck' }
  },
  completedIds: ['1']
};

export const adapter = createEntityAdapter<TodoEntity>();
export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.ITEM_ADDED_SUCCESS: {
      const tempState = adapter.removeOne(action.oldId, state);
      return adapter.addOne(action.item, tempState);
    }
    case actions.ITEM_ADDED: {
      return adapter.addOne(action.item, state);
    }
    case actions.ITEM_COMPLETE: {
      return tassign(state, {
        completedIds: [action.item.id, ...state.completedIds]
      });
    }
    default: {
      return state;
    }
  }
}

// feature

export const _selectTodosFeature = createFeatureSelector<State>('todos');
// per branch

// helpers
export const { selectAll: _selectAllTodos } = adapter.getSelectors(_selectTodosFeature);
export const _selectCompletedIds = createSelector(_selectTodosFeature, f => f.completedIds);
// component selector
// selector that returen TodoListItem[]
export const selectTodoListItems = createSelector(_selectAllTodos, _selectCompletedIds, (todos, ids) => {
  return todos.map(todo => {
    return ({
      id: todo.id,
      description: todo.description,
      completed: ids.some(i => i === todo.id),
      temporary: todo.id.startsWith('T')
    }) as TodoListItem;
  });
});
