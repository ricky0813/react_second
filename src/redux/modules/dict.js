// const CREATE

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from './../../firebase';

// Actions
const LOAD = 'dict/LOAD'
const CREATE = 'dict/CREATE'
const UPDATE = 'dict/UPDATE'
const DELETE = 'dict/DELETE'

const initialState = {
    list: []
}


// Action Creators
export function loadDict(dict_list){
    return {type: LOAD, dict_list}
}
export function createDict(dict){
    return {type: CREATE, dict};
}
export function updateDict(index, dict){
    return {type: UPDATE, dict, index}
}
export function deleteDict(index){
    return {type: DELETE, index}
}

// middlewares
export const loadDictFB = () => {
    // dispatch를 파라미터로 받는 함수를 return
    return async function (dispatch) {
        // getDocs로 컬렉션 내의 모든 데이터를 가져온다.
        const dict_Data = await getDocs(collection(db, 'dict')); 
        console.log(dict_Data)
        console.log('데이터를 가져왔습니다!')   
        let dict_list = [];
        // 파이어스토어에서 가져온 데이터에 forEach(배열 메서드X)를 돌면서 새로 선언한 배열에 push 
        dict_Data.forEach(d => dict_list.push({id: d.id, ...d.data()}))
        // 만든 배열로 리덕스에 LOAD 액션 디스패치
        dispatch(loadDict(dict_list))
    }
}

export const createDictFB = (dict) => {
    return async function (dispatch) {
        // 파이어 스토어에 addDoc으로 받아온 데이터를 추가
        const docRef = await addDoc(collection(db,'dict'), dict)
        // 받아온 데이터에 id값을 더해 새로운 객체 생성
        const dict_data = {id: docRef.id, ...dict}
        // 새로 만든 객체로 리덕스에 CREATE 액션을 dispatch
        dispatch(createDict(dict_data))      
    }
}

export const updateDictFB = (dict_id, dict) => {
    return async function(dispatch, getState){
        // doc로 참조할 데이터 값을 변수에 담는다.
        const docRef = doc(db, 'dict', dict_id);
        // 참조할 데이터 값과, 업데이트할 내용을 updateDoc로 파이어스토어에 업데이트 한다.
        await updateDoc(docRef,dict);
        //getState로 가져온 리스트에서 아이디가 같은 요소를 findIndex로 찾아 index값을 반환한다.
        const dict_find = getState().dict.list.findIndex(d => d.id === dict_id);
        // 인덱스값과 업데이트할 내용으로 리덕스에 UPDATE 액션을 dispatch
        dispatch(updateDict(dict_find, dict));   
    }
}

export const deleteDictFB = (dict_id) => {
    return async function(dispatch, getState){
        // 업데이트 미들웨어와 거의 동일
        const docRef = doc(db, 'dict', dict_id);
        await deleteDoc(docRef)

        const dict_find = getState().dict.list.findIndex(d => d.id === dict_id);
        dispatch(deleteDict(dict_find));
    }
}





// Reducer
export default function reducer(state = initialState, action = {}){
    switch(action.type) {
        case 'dict/LOAD' : return {list: action.dict_list};
        case 'dict/CREATE' : {
            const new_list = [...state.list, action.dict];
            return {list: new_list}
        };
        case 'dict/UPDATE' : {
            // 인덱스가 같은 객체를 찾아서 업데이트할 내용을 추가한 객체 반환
            const new_list = state.list.map((d,i) => i === action.index ? {...d, ...action.dict} : d)
            return {list: new_list}
        };
        case 'dict/DELETE' : {
            // filter로 인덱스가 같은 객체만 제거한다.
            const new_list = state.list.filter((d,i) => i !== action.index)
            return {list: new_list}
        }
        default: return state;
    }
}


