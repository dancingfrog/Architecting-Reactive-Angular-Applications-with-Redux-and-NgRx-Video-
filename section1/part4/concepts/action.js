// action

const action = { type: 'CREATE_ITEM', payload: 'new item' };
console.log(action);

// action creator

const actionFactory = (action_type, action_item) => ({ type: action_type, payload: action_item });

console.log(actionFactory('CREATE_ITEM',  'item1'));
console.log(actionFactory('CREATE_ITEM', 'item2'));
console.log(actionFactory('CREATE_ITEM', 'item3'));
console.log(actionFactory('REMOVE_ITEM', 'item1'));
