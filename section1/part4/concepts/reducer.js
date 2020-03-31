// reducer

function reducer(prevState = { list: [] }, action) {
    const newState = {
        'prevState': {}
    };
    newState['prevState'] = {};

    // an example of where recursion would be
    // a great improvement over iteration
    for (const p in prevState) {
        if (typeof prevState[p] == "undefined") {
            newState[p] = null;
            newState['prevState'][p] = null;
        } else if (prevState.hasOwnProperty(p)) {
            if (typeof prevState[p] !== 'object') {
                newState[p] = prevState[p];
                newState['prevState'][p] = prevState[p];
            } else {
                newState[p] = (Array.isArray(prevState[p])) ? [] : {};
                newState['prevState'][p] = (Array.isArray(prevState[p])) ? [] : {};
                for (const pp in prevState[p]) {
                    if (prevState[p].hasOwnProperty(pp)) {
                        if (typeof prevState[p][pp] !== 'object') {
                            newState[p][pp] = prevState[p][pp];
                            newState['prevState'][p][pp] = prevState[p][pp];
                        } else {
                            newState[p][pp] = (Array.isArray(prevState[p][pp])) ? [] : {};
                            newState['prevState'][p][pp] = (Array.isArray(prevState[p][pp])) ? [] : {};
                            for (const ppp in prevState[p][pp]) {
                                if (prevState[p][pp].hasOwnProperty(ppp)) {
                                    newState[p][pp][ppp] = prevState[p][pp][ppp];
                                    newState['prevState'][p][pp][ppp] = prevState[p][pp][ppp];
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (!('list' in prevState)) prevState.list = [];

    switch(action.type) {
        case 'CREATE_ITEM':
            newState.list = [].concat(...prevState.list, action.payload);
            break;

        case 'REMOVE_ITEM':
            const mostRecentState = prevState.list;
            const itemIndex = mostRecentState.findIndex((v, i, a) => action.payload.title === v.title);
            newState.list = [].concat(...(mostRecentState.slice(0, itemIndex)), ...(mostRecentState.slice(itemIndex + 1)));
            break;

        default:
            newState.list = [];
    }
    return newState;
}

// test
const actionFactory = require("./action");

let state = []; // In actuality, state is a property of the store, *not* a global var
console.log('init state', state);

state = reducer(state, actionFactory('CREATE_ITEM', { title: 'new item' }));
console.log('update state', state);

state = reducer(state, actionFactory('CREATE_ITEM', { title: 'new item2' }));
console.log('update state', state);

state = reducer(state, actionFactory('REMOVE_ITEM', { title: 'new item' }));
console.log('update state', state);

module.exports = reducer;
