import {combineReducers, compose, createStore} from "redux"
import zone from "../components/zone/reducer"
import {namespaced, subspace} from "redux-subspace";
import matrix, {initialState} from "../components/matrix/reducer";

/**
 * Store
 * Store is association between a list of all zone and a constant list from matrix props
 */
const initialStore = combineReducers((() => {
    return {
        zones: zones(initialState.column * initialState.row),
        constants: matrix
    }
})())

export const store = createStore(
    initialStore,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
)

/**
 * 2 subspace for constants and zones
 */
export const constantsStore = subspace((state) => state.constants)(store)
export const zoneStore = subspace((state) => state.zones)(store)

/**
 * Updated store with Zones reducer as column and row from Constants
 * @type {Number}
 */
export function updateZone(size) {
    return combineReducers((() => {
        return {
            zones: zones(size),
            constants: matrix
        }
    })())
}

/**
 * Create a reducer with all zone
 * @param size
 * @returns {Number}
 */
function zones(size) {
    const zones = {}
    for (let i = 0; i < size; i++) {
        zones[i] = namespaced('' + i)(zone)
    }
    return combineReducers(zones)
}

export default store