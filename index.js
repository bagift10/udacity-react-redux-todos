function createStore () {
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
  }

  return {
    getState,
    subscribe
  };
}

const store = createStore();
store.subscribe(() => {
  console.log('The new state is: ', store.state);
});

store.subscribe(() => {
  console.log('The state changed.');
});
