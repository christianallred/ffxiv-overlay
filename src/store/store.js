import { createStore } from 'redux'
import applyEventListners from './eventListeners'
import { concat, sortBy,filter } from 'lodash';
// Constants
const HANDLE_DATA_INJEST = "HANDLE_DATA_INJEST";
const HANDLE_STATE_CHANGE = "HANDLE_STATE_CHANGE";
const HANDLE_ENCOUNTER_SELECT = "HANDLE_ENCOUNTER_SELECT";
const HANDLE_COMBATANT_SELECT = "HANDLE_COMBATANT_SELECT"
const HANDLE_CHART_VIEW_CHANGE = "HANDLE_CHART_VIEW_CHANGE";
const TOGGLE_SHOW_DETAILS = "TOGGLE_SHOW_DETAILS";


export const chartViews =  {
    Damage: 'Damage',
    Healing: 'Healing',
    Tanking: 'Tanking'
}

// Initial
const initialState = {
    data: {
        Encounter: {}, 
        Combatant: {},
    },
    Encounters: [],
    SelectedEncounter: null,
    SelectedCombatant: null,
    chartView: chartViews.Damage,
    showDetails: false,
}


// Reducers
const reducer = (state, action) => {

    switch (action.type) {
        case HANDLE_DATA_INJEST:
            if (
                state.data.Encounter && state.data.Encounter.title === 'Encounter' &&
                action.data.Encounter.title !== 'Encounter'
            ){
                const newEncs = concat(
                    [{
                        Encounter: action.data.Encounter,
                        Combatant: action.data.Combatant
                    }],
                    state.Encounters
                )
                if (newEncs.length > 15){
                    newEncs.pop();
                }   
                state.Encounters = newEncs
            }

            // this is important that it is at the end
            state.data = action.data
            return state;

        case HANDLE_STATE_CHANGE:
            return state;
        case HANDLE_ENCOUNTER_SELECT: 
            return {...state, SelectedEncounter: action.index, SelectedCombatant: null}
        case HANDLE_CHART_VIEW_CHANGE: 
            return {...state, chartView: getNextChartView(state.chartView)}
        case TOGGLE_SHOW_DETAILS:
            return {...state, showDetails: !state.showDetails}
        case HANDLE_COMBATANT_SELECT: 
            return {...state, SelectedCombatant: action.combatant}
        default:
            return state
    }
}

// Selector
export const getSelectedData = (state) => {
    var data = {};

    // first see what encounter we are viewing. 
    if (state.SelectedEncounter !== null){
        data = state.Encounters[state.SelectedEncounter]
    } else {
        data = state.data
    }
    //return data;
    // now see what data set we want. 
    var ClonedData = Object.assign({}, data);

    // Healing
    if (state.chartView === chartViews.Healing) {
        ClonedData.Combatant = sortBy(
            filter(ClonedData.Combatant, (d) => parseInt(d.healed, 10) > 0), 
            (d) => -parseInt(d.healed, 10)   
        );
    }
    // Tanking
    else if (state.chartView === chartViews.Tanking) {
        ClonedData.Combatant = sortBy( 
            filter(ClonedData.Combatant, d => parseInt(d.damagetaken, 10) > 0),
            (d) => -parseInt(d.damagetaken, 10)
        );
    }

    return ClonedData;
}

export const getSelectedCombatant = (state) => {
    const Encounter = getSelectedData(state);
    return Encounter.Combatant[state.SelectedCombatant]
}



// Actions
export const hanldeInjest = (data) => ({
    type: HANDLE_DATA_INJEST,
    data 
})

export const handleStateChange = (data) => ({
    type: HANDLE_STATE_CHANGE,
    data
})

export const handleEncounterSelect = (index) => ({
    type: HANDLE_ENCOUNTER_SELECT,
    index
})

export const hanldeChartViewChange = () => ({
    type: HANDLE_CHART_VIEW_CHANGE,

})
export const hanldeToggleShowDetails = () => ({
    type: TOGGLE_SHOW_DETAILS,

})
export const hanldeCombatantSelect = (combatant) => ({
    type: HANDLE_COMBATANT_SELECT,
    combatant
})




// Store
const store = createStore( reducer, initialState )

applyEventListners(store.dispatch, store.getState)

export default store;



// Healpers
const getNextChartView = (current) => {
    switch(current){
        case chartViews.Damage: 
            return chartViews.Healing
        case chartViews.Healing:
                return chartViews.Tanking
        case chartViews.Tanking: 
            return chartViews.Damage
        default: 
            return chartViews.Damage
    }
}


