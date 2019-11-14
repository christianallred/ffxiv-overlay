import React from 'react'
import {connect} from 'react-redux'
import {
    getSelectedCombatant,
    hanldeCombatantSelect
} from '../../store/store'
import './styles.scss'
import formatter from '../../utils/formatter';

// TODO: work out better styling
const CombatantDetails =(props) =>{
    var rows = [];
    const DamageRowsMap = ['damage','encdps','MAXHIT','crithit%','DirectHitPct','CritDirectHitPct','misses','tohit',]
    const HealingRowsMap = ['healed','enchps','OverHealPct','critheal%','MAXHEAL','MAXHEALWARD',]
    const TankingRowsMap = ['damagetaken','healstaken','ParryPct','BlockPct','threatdelta','deaths',]

    const DamageRows = DamageRowsMap.map(item => {
        return <div>
            <span className="label ff-header">{item.toLowerCase()}: </span>
            <span className="value ff-text">{formatter(props.Combatant[item])}</span>
        </div>
    })
    const HealingRows = HealingRowsMap.map(item => {
        return <div>
            <span className="label ff-header">{item.toLowerCase()}: </span>
            <span className="value ff-text">{formatter(props.Combatant[item])}</span>
        </div>
    })
    const TankingRows = TankingRowsMap.map(item => {
        return <div>
            <span className="label ff-header">{item.toLowerCase()}: </span>
            <span className="value ff-text">{formatter(props.Combatant[item])}</span>
        </div>
    })
   
    return (
        <div className="combatant-detail">
            
            <span className="button" onClick={() => props.hanldeCombatantSelect(null)}>back</span>
            
            <span className="label ff-header"> {props.Combatant.name}</span>

            <div className="details-wrapper">
                <div>
                    <span className="label ff-header">Damage</span>
                    {DamageRows}
                </div>
                <div>
                    <span className="label ff-header">Healing</span>
                    {HealingRows}
                </div>
                <div>
                    <span className="label ff-header">Tanking</span>
                    {TankingRows}
                </div>
            </div>
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