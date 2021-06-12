// Library Code
function createStore (reducer) {
  // The store should have 4 parts
  // 1. The state
  // 2. Get the state
  // 3. Listen for changes to the state
  // 4. Update the state

  // 1. Create the state
  let state;
  let listeners = [];

  // 2. Get the state
  const getState = () => state;

  // 3. Listen for changes to the state
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l!== listener);
    };
  }

  // 4. Update the state
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  return {
    getState,
    subscribe,
    dispatch
  };
}

// App Code
function todos (state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo]);
  }

  return state;
}

const store = createStore(todos);

store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Read a book',
    complete: false
  }
});
