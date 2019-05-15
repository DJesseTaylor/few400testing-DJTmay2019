import * as fromReducer from './index';
import * as actions from '../actions/list.actions';
import * as rootReducer from '../../../reducers';

describe('the reducer', () => {
  describe('adding an item', () => {
    it('adding to an emtpy state', () => {
      const initialState = fromReducer.adapter.getInitialState({ completedIds: [] });

      const action: actions.AddedItem = {
        type: actions.ITEM_ADDED,
        item: {
          id: '42',
          description: 'tacos'
        }
      };

      const resultState = fromReducer.reducer(initialState, action);

      expect(resultState).toEqual({
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: []
      });
    });

    it('adding an item to the state when there is some data in it', () => {
      const initialState: fromReducer.State = {
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: []
      };

      const action: actions.AddedItem = {
        type: actions.ITEM_ADDED,
        item: {
          id: '19',
          description: 'beer'
        }
      };

      const resultState = fromReducer.reducer(initialState, action);

      expect(resultState).toEqual({
        ids: ['42', '19'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          },
          19: {
            id: '19',
            description: 'beer'
          }
        },
        completedIds: []
      });
    });

    it('can be done', () => {
      const initialState: fromReducer.State = {
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: []
      };

      const action: actions.CompletedItem = {
        type: actions.ITEM_COMPLETE,
        item: {
          id: '42',
          description: 'tacos'
        }
      };

      const result = fromReducer.reducer(initialState, action);

      expect(result).toEqual({
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: ['42']
      });
    });
  });
});

describe('Selectors', () => {
  const initialState: rootReducer.State = {
    todos: {
      ids: [
        '1',
        '2',
        'T0'
      ],
      entities: {
        1: {
          id: '1',
          description: 'Clean Garage'
        },
        2: {
          id: '2',
          description: 'Finish Darly\'s Deck'
        },
        T0: {
          id: 'T0',
          description: 'Beer'
        }
      },
      completedIds: [
        '1'
      ]
    }
  };
  it('has a feature selector that returns the todos', () => {
    const todoState = fromReducer._selectTodosFeature(initialState);

    expect(todoState).toEqual({
      ids: [
        '1',
        '2',
        'T0'
      ],
      entities: {
        1: {
          id: '1',
          description: 'Clean Garage'
        },
        2: {
          id: '2',
          description: 'Finish Darly\'s Deck'
        },
        T0: {
          id: 'T0',
          description: 'Beer'
        }
      },
      completedIds: [
        '1'
      ]
    });
  });

  it('can get the completed ids', () => {
    const completedIds = fromReducer._selectCompletedIds(initialState);

    expect(completedIds).toEqual(['1']);
  });

  it('can give you the model for the component', () => {
    const model = fromReducer.selectTodoListItems(initialState);

    expect(model).toEqual([
      {
        id: '1',
        description: 'Clean Garage',
        completed: true,
        temporary: false
      },
      {
        id: '2',
        description: 'Finish Darly\'s Deck',
        completed: false,
        temporary: false
      },
      {
        id: 'T0',
        description: 'Beer',
        completed: false,
        temporary: true
      }
    ]);
  });
});
