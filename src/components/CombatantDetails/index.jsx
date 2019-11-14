import React from 'react'
import {connect} from 'react-redux'
import {
    getSelectedCombatant,
    hanldeCombatantSelect
} from '../../store/store'
import './styles.scss'

// TODO: work out better styling
const CombatantDetails =(props) =>{
    console.log(props);
    var rows = [];
    for (const prop in props.Combatant) {
        if (!props.Combatant.hasOwnProperty(prop)) continue;
        rows.push(
            <div>
                <span className="label ff-header">{prop}: </span>
                <span className="value ff-text">{props.Combatant[prop]}</span>
            </div>
        )     
    }
   
    return (
        <div className="combatant-detail">
            <span className="label ff-header" onClick={() => props.hanldeCombatantSelect(null)}>back</span>
            {rows}
        </div>
    )
}

const mapDispatchToProps = {
    hanldeCombatantSelect
}

const mapStateToProps = (state /*, ownProps*/) =>
{
    return {
        charView: state.chartView,
        Combatant: getSelectedCombatant(state)
    }
} 

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {pure: false}
)(CombatantDetails)