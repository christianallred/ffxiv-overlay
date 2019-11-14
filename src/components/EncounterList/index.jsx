import React, {useState} from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral';

import {
    handleEncounterSelect, 
    getSelectedData
} from '../../store/store'
import './style.scss'

const EncounterList = (props) => {
    const [show, setShow] = useState(false);

    const encounters = props.Encounters.map((encounter, index) => {
        return (
            <div key={index} onClick={ () => props.handleEncounterSelect(index)}>
                {encounter.Encounter.title}
            </div>
        );
    });

    return (
        <div className="encounter-data ff-header">
            <span className="button" onClick={ () => setShow( !show ) }>
                {props.Encounter.title ? props.Encounter.title : "Encounter"} - {numeral(props.Encounter.DURATION).format("00:00")} 
                {!show ? null : <div className="dropdown-menu encounters-list-dropdown">
                    <div onClick={() => props.handleEncounterSelect(null)}>Current Fight</div>
                    {/* <div onClick={() => props.handleEncounterSelect("ALL")}>All</div> */}
                    {encounters}
                </div>
                }   
            </span>
        </div>
    )
}

const mapDispatchToProps = {
    handleEncounterSelect
}

const mapStateToProps = (state) => {
    return {
        Encounter: getSelectedData(state).Encounter,
        Encounters: state.Encounters
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {pure: false}
)(EncounterList)


