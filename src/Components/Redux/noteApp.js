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
        title: "1",
        time: 1597573620339,
        completed: false,
        important: true,
        note: "hallo1",
    },
    {
        title: "2",
        time: 1598568778148,
        completed: false,
        important: true,
        note: "hallo2",
    },
    {
        title: "3",
        time: 1597168778147,
        completed: true,
        note: "hallo3",
    },
    {
        title: "4",
        time: 1598568778146,
        completed: false,
        important: false,
        note: "hallo4",
    },
    {
        title: "5",
        time: 1596568778145,
        completed: false,
        important: true,
        note: "hallo5",
    },
    {
        title: "1236",
        time: 1597568778144,
        completed: false,
        important: false,
        note: "hallo6",
    },
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
