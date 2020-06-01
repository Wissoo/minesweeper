import {constants, zoneStore} from "./store";
import {globalAction, namespacedAction} from "redux-subspace";

// MATRIX
export const ADDCHECKED = 'ADDCHECKED'
export const PAUSE = 'PAUSE'
export const PLAY = 'PLAY'
export const END = 'END'
export const RESET = 'RESET'

// ZONE
export const MINE = 'MINE'
export const HIDE = 'HIDE'
export const SHOW = 'SHOW'
export const HIGHLIGHT = 'HIGHLIGHT'
export const INCREMENTNEIGHBOURHOOD = 'INCREMENTNEIGHBOURHOOD'


// Statics functions -> Bugged functions (a full rework is needed)
/**
 * Check a zone with his position
 * If the zone is mined, show all zone and endgame
 * Also show the zone and neighbourhood zones too
 * @param pos
 */
export function check(pos) {
    zoneStore.dispatch(namespacedAction('' + pos)({type: 'SHOW'}))

    if (zoneStore.getState()[pos].mined) {
        zoneStore.dispatch(globalAction({type: 'SHOW'}))
        constants.dispatch({type: 'END', zones: zoneStore.getState()})
    } else {
        constants.dispatch({type: 'ADDCHECKED', position: pos})
        // CHECK ARROUND
        if (!zoneStore.getState()[pos].minedNeighbours && !zoneStore.getState()[pos].mined) {
            neighbourhood(pos).filter(x => !Object.values(constants.getState().checked).includes(x)).map(e => check(e))
        }
        // ENDGAME IF ALL ZONE ARE SHOWED
        if (Object.keys(zoneStore.getState()).length === Object.keys(constants.getState().checked).length) {
            constants.dispatch({type: 'END', zones: zoneStore.getState()})
        }
    }
}

/**
 * Get all 8 (or less) neighbourhood of a zone
 * @param pos
 * @returns {[]} 1..8 zone position
 */
export function neighbourhood(pos) {
    let neighbourhood = []
    let column = constants.getState().column
    let row = constants.getState().row
    let topBound = (pos > column)
    let rightBound = (pos % column !== 0)
    let bottomBound = (pos < row * column - 10)
    let leftBound = (pos % column !== 1)

    if (topBound && leftBound) {
        neighbourhood.push(pos - column - 1)
    }
    if (topBound) {
        neighbourhood.push(pos - column)
    }
    if (topBound && rightBound) {
        neighbourhood.push(pos - column + 1)
    }

    if (bottomBound && leftBound) {
        neighbourhood.push(pos + column - 1)
    }
    if (bottomBound) {
        neighbourhood.push(pos + column)
    }
    if (bottomBound && rightBound) {
        neighbourhood.push(pos + column + 1)
    }

    if (leftBound) {
        neighbourhood.push(pos - 1)
    }
    if (rightBound) {
        neighbourhood.push(pos + 1)
    }
    return neighbourhood
}