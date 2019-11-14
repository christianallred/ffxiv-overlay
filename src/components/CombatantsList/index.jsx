import React from 'react'
import formatNumber from '../../utils/formatter';
import CombatantBar from '../CombatantBar/'
import {connect} from 'react-redux';
import {getSelectedData,chartViews} from '../../store/store'
import './style.scss'

const Combatants = (props) => {
    let maxRows = 20;
    let names =  Object.keys(props.Combatants)
    let maxdps = false;
    let ignoreRank = 0;
    
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
    

    let combatantRows = names.map((item, index) => {        
        if (index > maxRows) return null;
        let combatant = props.Combatants[item];
        let stats = null;
        let isSelf = combatant.name === 'YOU' || combatant.name === 'You';

        if (combatant.Job === ""){
            ignoreRank += 1
        } else if (combatant.Job !== "") {
            if (props.chartView === chartViews.Healing) {
                if (parseInt(combatant.healed, 10) > 0) {
                    if (!maxdps){
                        maxdps = parseFloat(combatant.healed);
                    }
                    stats = buildHealerData(combatant)
                }
            }
            else if (props.chartView === chartViews.Tanking) {
                if (parseInt(combatant.damagetaken, 10) > 0) {
                    if(!maxdps){
                        maxdps = parseFloat(combatant.damagetaken);
                    }
                    stats = buildTankData(combatant)
                }
            }
            else {
                if(!maxdps){
                    maxdps = parseFloat(combatant.damage);
                }
                stats = buildDamageData(combatant)
            }

            return <CombatantBar
                    onClick={props.onClick}
                    rank={ index + 1 - ignoreRank }
                    data={combatant}
                    isSelf={isSelf}
                    key={combatant.name}
                    max={maxdps}
                    {...stats} />
        }
        return null
    })

    // var types = [
    //     'pld',
    //     'war',
    //     'drk',
    //     'gbr',

    //     'whm',
    //     'sch',
    //     'ast',


    //     "mnk",
    //     'rog',
    //     'drg',
    //     'sam',

    //     'blm',
    //     'smn',
    //     'rdm',

    //     'brd',
    //     'mch',
    //     'dnc'
    // ]
    // let test = [];
    // for (const [index,item] of types) {
    //     test.push( 
    //         <li class="row">
    //             <div class={`bar ${item}`} style={{width: '100%'}}/>
    //             <div className="text-overlay">{item}</div>
    //         </li>)
    // }
    return (
        <ul className="combatants">
            {combatantRows}
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