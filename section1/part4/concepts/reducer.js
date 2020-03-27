// reducer

function reducer(prevState = [], action) {
  switch(action.type) {
    case 'CREATE_ITEM':
      return [ ...prevState, [].concat(...prevState, action.payload) ];

    case 'REMOVE_ITEM':
      const mostRecentState = prevState[prevState.length - 1];
      const itemIndex = mostRecentState.findIndex((v, i, a) => action.payload.title === v.title);
      return [ ...prevState, [].concat(...(mostRecentState.slice(0, itemIndex)), ...(mostRecentState.slice(itemIndex + 1))) ];

    default:
      return prevState;
  }
}

let state = [];
console.log('init state', state);

state = reducer([], { type: 'CREATE_ITEM', payload: { title: 'new item' } });
console.log('update state', state);

state = reducer(state, { type: 'CREATE_ITEM', payload: { title: 'new item2' } });
console.log('update state', state);

state = reducer(state, { type: 'REMOVE_ITEM', payload: { title: 'new item' } });
console.log('update state', state);
