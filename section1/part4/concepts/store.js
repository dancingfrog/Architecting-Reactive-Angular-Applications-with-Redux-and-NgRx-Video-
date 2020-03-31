// PSEUDO code
const reducer = require("./reducer");

// store
let state = {
  list: [],
  user: void 0
};

const listeners = [];

//dispatch
const dispatch = (action) => {
  state = reducer(state, action);
  console.log(state);

  listeners.forEach(listener => listener(action));
};

// select
const select = (fn) => fn(state);

const selector = (state) => state.list;

// subscribe
const subscribe = (listener) => {
  listeners.push(listener);
};

// test
const actionFactory = require("./action");
dispatch(actionFactory('CREATE_ITEM', { title: 'new item' }));
