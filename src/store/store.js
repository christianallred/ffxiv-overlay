import { createStore } from 'redux'
import applyEventListners from './eventListeners'
import { concat, sortBy,filter, cloneDeep } from 'lodash';
import {whiteListendEncounterMetrics,whiteListCombatantMetrics} from '../utils/constants';
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
            var clonedState = cloneDeep(state);
            const processedData = processData(action.data);

            if (
                clonedState.data.Encounter && clonedState.data.Encounter.title === 'Encounter' &&
                processedData.Encounter.title !== 'Encounter'
            ){
                var newEncs = concat(
                    [ processedData ],
                    clonedState.Encounters
                )
                if (newEncs.length > 15){
                    newEncs.pop();
                }   
                
                clonedState.Encounters = newEncs
            }

            // this is important that it is at the end
            clonedState.data = processedData
            return clonedState;

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
        if (state.SelectedEncounter === "ALL"){
            //data = state.data
            data = deepMergeEncounters( state.Encounters )
        } else {
            data = state.Encounters[state.SelectedEncounter]
        }
    } else {
        data = state.data
    }

    // now see what data set we want. 
    var ClonedData = Object.assign({}, data);
    // this is bad because it is changing the shape of combatants
    if (state.chartView === chartViews.Healing) {
        ClonedData.Combatant = sortBy(
            filter(ClonedData.Combatant, (d) => parseInt(d.healed, 10) > 0), 
            (d) => -parseInt(d.healed, 10)   
        );
    }
    else if (state.chartView === chartViews.Tanking) {
        ClonedData.Combatant = sortBy( 
            filter(ClonedData.Combatant, d => parseInt(d.damagetaken, 10) > 0),
            (d) => -parseInt(d.damagetaken, 10)
        );
    } 
    else if (state.chartView === chartViews.Damage){
        ClonedData.Combatant = sortBy( 
            filter(ClonedData.Combatant, d => parseInt(d.damage, 10) > 0),
            (d) => -parseInt(d.damage, 10)
        );
    }

    return ClonedData;
}

export const getSelectedCombatant = (state) => {
    const Encounter = getSelectedData(state);
    return Encounter.Combatant.find(cob => cob.name === state.SelectedCombatant)
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

// Helpers
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

// tehse functions are for simplifying teh data from teh plugin
const processData = (data) => {
    var processData = {
        Encounter: processEncounter(data.Encounter),
        Combatant: {},
    };
    for (const key in data.Combatant) {
        if (!data.Combatant.hasOwnProperty(key)) continue;
        processData.Combatant[key] = processCombatant(data.Combatant[key])
    }
    return processData;
}
const processEncounter = ( Encounter ) => {
    var encounter = {};
    for(let obj in Encounter){
        if (!Encounter.hasOwnProperty(obj)) continue;
        if (whiteListendEncounterMetrics.some(metric => metric === obj)){
            encounter[obj] = Encounter[obj];
        }
    }
    return encounter
}
const processCombatant = ( Combatant ) => {
    var combatant = {};
    for(let obj in Combatant){
        if (!Combatant.hasOwnProperty(obj)) continue;
        if (whiteListCombatantMetrics.some(metric => metric === obj)){
            combatant[obj] = Combatant[obj];
        }
    }
    return combatant
}


// this is so taht we can use the All COmmand pretty broken atm...
const deepMergeEncounters = (encounters) => {
    var Encounters = cloneDeep(encounters);
    var ret = {
        Combatant: {},
        Encounter: {},
    }
    for (let index = 0; index < Encounters.length; index++) {
        const encounter = Encounters[index];
        const Combatants = encounter.Combatant;
        const Encounter = encounter.Encounter;
        if (index === 0){
            ret = encounter;
            continue;
        }
        ret.Encounter = deepMergeEncounter(Encounter, ret.Encounter) 
        for (let prop in Combatants){
            if (!Combatants.hasOwnProperty(prop)) continue
            const combatant = Combatants[prop];
            if ( ret.Combatant.hasOwnProperty(prop) ){
                ret.Combatant[prop] = deepMergeCombatants(combatant, ret.Combatant[prop] )
            } else {
                ret.Combatant[prop] = combatant
            }
        }
    }
    return ret;
}

const deepMergeEncounter = (encounter, ExistingEncounter) => { 
    // todo: finish teh merge logic
    return {
        ...ExistingEncounter,
        title: "All",
        duration: '--', // TODO:
        DURATION: parseInt(ExistingEncounter.DURATION) + parseInt(encounter.DURATION),
        damage: parseInt(ExistingEncounter.damage) + parseInt(encounter.damage),
        // 'dps',
        // 'encdps',
        // 'hits',
        // 'crithits',
        // 'crithit%',
        // 'misses',
        // 'maxhit',
        // 'MAXHIT',
        // 'healed',
        // 'enchps',
        // 'critheal%',
        // 'maxheal',
        // 'maxhealward',
        // 'damagetaken',
        // 'healstaken',
        // 'powerdrain',
        // 'powerheal',
        // 'kills',
        // 'deaths',
        // 'CurrentZoneName',
        // 'Last10DPS',
        // 'Last30DPS',
        // 'Last60DPS'
    }
    
}

const deepMergeCombatants = (combatant, Existing) => {
    // TODO: finish teh merge logic. 
    var object = {
        ...Existing,
        DURATION: parseInt(Existing.DURATION) + parseInt(combatant.DURATION),
        damage: parseInt(Existing.damage) + parseInt(combatant.damage),
        dps: 0, // TODO: Calculate 
        encdps: 0, // TODO: Calculate 
        hits: parseInt(Existing.hits) + parseInt(combatant.hits),
        crithits: parseInt(Existing.crithits) + parseInt(combatant.crithits),
        'crithit%': 0, // TODO: Calculate 
        misses: parseInt(Existing.misses) + parseInt(combatant.misses),
        swings: parseInt(Existing.swings) + parseInt(combatant.swings),
        tohit: 0, // ???
        maxhit: 0, // calc
        MAXHIT: 0, // calc,
        DirectHitPct: 0, // calc
        DirectHitCount: parseInt(Existing.DirectHitCount) + parseInt(combatant.DirectHitCount),
        CritDirectHitPct: 0, // calc
        CritDirectHitCount: parseInt(Existing.CritDirectHitCount) + parseInt(combatant.CritDirectHitCount),
        healed: parseInt(Existing.healed) + parseInt(combatant.healed),
        'healed%': 0, // calc
        enchps: 0, // calc
        critheals: parseInt(Existing.critheals) + parseInt(combatant.critheals),
        'critheal%': 0, // calc
        maxheal: 0, // calc
        MAXHEAL: 0, // calc
        maxhealward: 0, // calc
        MAXHEALWARD: 0, // calc
        OverHealPct: 0, // calc
        damagetaken: parseInt(Existing.damagetaken) + parseInt(combatant.damagetaken),
        healstaken: parseInt(Existing.healstaken) + parseInt(combatant.healstaken),
        powerdrain: parseInt(Existing.powerdrain) + parseInt(combatant.powerdrain),
        powerheal: parseInt(Existing.powerheal) + parseInt(combatant.powerheal),
        kills: parseInt(Existing.kills) + parseInt(combatant.kills),
        deaths: parseInt(Existing.deaths) + parseInt(combatant.deaths),
        threatdelta: 0, // calc
        Last10DPS: 0,
        Last30DPS: 0, 
        Last60DPS: 0,
        Job: combatant.Job,
        ParryPct: 0, // No way to calc
        BlockPct: 0, // no way to calc
    }
    return object;
}

