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

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function todos (state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete }));
    default:
      return state;
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app);

store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Read a book',
    complete: false
  }
});

store.dispatch({
  type: REMOVE_TODO,
  id: 1
});

store.dispatch({
  type: TOGGLE_TODO,
  id: 0
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Complete my Nanodegree program'
  }
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Get a job as a React developer'
  }
});

store.dispatch({
  type: REMOVE_GOAL,
  id: 0
});
