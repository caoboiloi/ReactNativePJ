export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
import remove from "lodash.remove";

export function addnote(note) {
    return {
        type: ADD_NOTE,
        payload: note,
    };
}

export function deletenote(id) {
    return {
        type: DELETE_NOTE,
        payload: id,
    };
}

export function editnote(note) {
    return {
        type: EDIT_NOTE,
        payload: note,
    };
}

// reducer

const initialState = [

    {
        "completed": false,
        "important": false,
        "note": "",
        "time": 1599124424212,
        "title": "  Hhd",
    },
    {
        "completed": false,
        "important": false,
        "note": "",
        "time": 1599124424312,
        "title": "  Hhd1",
    }

];

function notesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTE:
            return [
                ...state,
                {
                    title: action.payload.title,
                    time: action.payload.time,
                    completed: false,
                    important: action.payload.important,
                    note: action.payload.note,
                },
            ];
        case EDIT_NOTE:
            return [...action.payload];
        case DELETE_NOTE:
            const deletedNewArray = remove(state, (obj) => {
                return obj.time != action.payload;
            });
            return deletedNewArray;

        default:
            return state;
    }
}

export default notesReducer;