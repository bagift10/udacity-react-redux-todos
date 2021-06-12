function createStore () {
  // The store should have 4 parts
  // 1. The state
  // 2. Get the state
  // 3. Listen for changes to the state
  // 4. Update the state

  let state;

  const getState = () => state;

  return { getState };
}