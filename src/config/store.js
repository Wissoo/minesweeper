import {combineReducers, compose, createStore} from "redux"
import zone from "../components/zone/reducer"
import {namespaced, subspace} from "redux-subspace";
import matrix, {initialState} from "../components/matrix/reducer";

/**
 * Store
 * Store is association between a list of all zone and a constant list from matrix props
 */
export const store = createStore(
    combineReducers((() => {
        // Zone list
        const zones = {}
        for (let i = 1; i < initialState.column * initialState.row + 1; i++) {
            zones[i] = namespaced('' + i)(zone)
        }

        return {
            zones: combineReducers(zones),
            constants: matrix
        }
    })()),
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
)

export const zoneStore = subspace((state) => state.zones)(store)
export const constants = subspace((state) => state.constants)(store)
export default store