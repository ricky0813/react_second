// const CREATE

// Actions
const CREATE = 'dict/CREATE'

const initialState = {
    list: [
        { word: '단어', exp: '설명설명', ex: '예시예시'},
        { word: '이거지!', exp: '이걸거야!', ex: '암 그렇고 말고!'},
        { word: '될까?', exp: '될걸..?', ex: '되지 않을까?'},
    ]
}


// Action Creators
export function createDict(dict){
    return {type: CREATE, dict};
}


// Reducer
export default function reducer(state = initialState, action = {}){
    switch(action.type) {
        case 'dict/CREATE' : {
            const new_list = [...state.list, action.dict];

            return {list: new_list}
        }
        default: return state;
    }
}


