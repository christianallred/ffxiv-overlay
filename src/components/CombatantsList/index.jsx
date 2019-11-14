import React from 'react'
import formatNumber from '../../utils/formatter';
import CombatantBar from '../CombatantBar/'
import {connect} from 'react-redux';
import {getSelectedData,chartViews} from '../../store/store'
import './style.scss'

const Combatants = (props) => {
    var maxRows = 12;
    var names =  Object.keys(props.Combatants)
    var maxdps = false;
    
    const buildHealerData = (combatant) => {
        return {
            job: combatant.Job || '',
            characterName: combatant.name,
            total: combatant.healed,
            totalFormatted: formatNumber(combatant.healed),
            perSecond: formatNumber(combatant.enchps),
            additional: combatant['OverHealPct'],
            percentage: combatant['healed%']
        }
    }
    const buildTankData = (combatant) => {
        return{
            job: combatant.Job || '',
            characterName: combatant.name,
            total: combatant.damagetaken,
            totalFormatted: formatNumber(combatant.damagetaken),
            perSecond: combatant.ParryPct,
            percentage: combatant.BlockPct
        }
    }
    const buildDamageData = (combatant) => {
        return {
            job: combatant.Job || '',
            characterName: combatant.name,
            total: combatant.damage,
            totalFormatted: formatNumber(combatant.damage),
            perSecond: formatNumber(combatant.encdps),
            percentage: combatant['damage%']
        }
    }

    var test = names.map((item, index) => {
        
        if (index > maxRows) return null;
        let combatant = props.Combatants[item];
        let stats = null;
        let isSelf = combatant.name === 'YOU' || combatant.name === 'You';

        if (combatant.Job !== "") {
            if (props.chartView === chartViews.Healing) {
                if (parseInt(combatant.healed, 10) > 0) {
                    if (index === 0){
                        maxdps = parseFloat(combatant.healed);
                    }
                    stats = buildHealerData(combatant)
                }
            }
            else if (props.chartView === chartViews.Tanking) {
                if (parseInt(combatant.damagetaken, 10) > 0) {
                    if(index === 0){
                        maxdps = parseFloat(combatant.damagetaken);
                    }
                    stats = buildTankData(combatant)
                }
            }
            else {
                if(index === 0){
                    maxdps = parseFloat(combatant.damage);
                }
                stats = buildDamageData(combatant)
            }

            return <CombatantBar
                    onClick={props.onClick}
                    rank={index + 1}
                    data={combatant}
                    isSelf={isSelf}
                    key={combatant.name}
                    max={maxdps}
                    {...stats} />
        }
        return null
    })

    return (
        <ul className="combatants">
            {test}
        </ul>
    );
}


const mapStateToProps = (state /*, ownProps*/) => {
    const selected = getSelectedData(state);
    return {
        Combatants: selected.Combatant,
        chartView: state.chartView,
    }
}

  
// const mapDispatchToProps = { increment, decrement, reset }
  
export default connect(
    mapStateToProps,
    null,
    null,
    {pure: false}
)(Combatants)