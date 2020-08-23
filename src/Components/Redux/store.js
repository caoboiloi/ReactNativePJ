import {
    createStore
} from 'redux'
import notesReducer from './noteApp'

const store = createStore(notesReducer)

export default store