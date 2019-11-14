import React, {useState} from 'react'
import { connect } from 'react-redux'
import formatNumber from '../../utils/formatter'
import { getSelectedData } from '../../store/store'
import './style.scss'

const EncounterStats = (props) => {
    const [group, setGroup] = useState(true)

    if (!props.showDetails) return <div></div>

    var data = props.Combatant;
    var encounter = props.Encounter;
    
    // need to fix this
    if (!data){
        return <div></div>
    }

    var self = data['YOU'];
    
    // This is the switcher for Toggling group info or self info
    var DataSource = group ? encounter : self;
    
    if (self === undefined){
        DataSource = encounter;
    }
    
    // Calculate the drect hit % based off of the combatant list. This is not efficient and needs to be removed
    // Once the encounter object is fixed to properly include this info.
    var datalength = 0;
    var DirectHitPct = 0
    var CritDirectHitPct = 0;
    
    if (group){
      if (data !== undefined){
        for (var x in data){
          if(!data.hasOwnProperty(x)) continue;
          DirectHitPct += parseFloat(data[x].DirectHitPct.substring(0, (data[x].DirectHitPct.length - 1)));
          CritDirectHitPct += parseFloat(data[x].CritDirectHitPct.substring(0, (data[x].CritDirectHitPct.length - 1)));
          datalength++;
        }

        if ( DirectHitPct > 0 ){
            DirectHitPct = parseFloat( DirectHitPct / datalength);
        }
        if (CritDirectHitPct > 0){
          CritDirectHitPct = parseFloat( CritDirectHitPct / datalength);
        }
      }

    } else {
      if (self !== undefined){
        DirectHitPct = self.DirectHitPct;
        CritDirectHitPct = self.CritDirectHitPct;
      }
    }
   
    return (
        <div className="extra-details">
            {
                props.chartView === "Damage" ?
                    <div className="data-set-view-switcher clearfix" onClick={ () => setGroup(!group) }>
                        <span className={`button data-set-option ${group ? 'active' : ''}`}>Grp</span>
                        <span className={`button data-set-option ${!group ? 'active' : ''}`}>Ind</span>
                    </div>
                : null
            }
            <div className="extra-row damage">
                <div className="cell">
                    <span className="label ff-header">Damage</span>
                    <span className="value ff-text">
                        {`${formatNumber(DataSource.damage)} (${formatNumber(DataSource.encdps)})`}
                    </span>
                </div>

                <div className="cell">
                    <span className="label ff-header">Max</span>
                    <span className="value ff-text">
                        {DataSource.maxhit}
                    </span>
                </div>
            </div>

            <div className="extra-row damage">
                {/* crithit is not being calculated properly in the Encounter object so instead we are calcing it on the fly*/}
                <div className="cell">
                    <span className="label ff-header">Crit%</span>
                    <span className="value ff-text">
                    { formatNumber( parseFloat(DataSource.crithits / DataSource.hits * 100) ) + "%" }
                    </span>
                </div>
                <div className="cell">
                    <span className="label ff-header">Misses</span>
                    <span className="value ff-text">
                        {encounter.misses}
                    </span>
                </div>
                {/* DirectHitPct coming from the Encounter object is missing so we are calcing above */}
                <div className="cell">
                    <span className="label ff-header">Direct%</span>
                    <span className="value ff-text">
                        {formatNumber(DirectHitPct) + "%"}
                    </span>
                </div>
                {/* CritDirectHitPct coming from the Encounter object is missing so we are calcing above */}
                <div className="cell">
                    <span className="label ff-header">DirectCrit%</span>
                    <span className="value ff-text">
                        {formatNumber(CritDirectHitPct) + "%"}
                    </span>
                </div>
            </div>
            
            <div className="extra-row healing">
                <div className="cell">
                    <span className="label ff-header">Heals</span>
                    <span className="value ff-text">
                        {`${formatNumber(DataSource.healed)} (${formatNumber(DataSource.enchps)})`}
                    </span>
                </div>
                {/* Overlay plugin is not returning correct heal values  */}
                <div className="cell">
                    <span className="label ff-header">Crit%</span>
                    <span className="value ff-text">
                        {DataSource['critheal%']}
                    </span>
                </div>
                <div className="cell">
                    <span className="label ff-header">Max</span>
                    <span className="value ff-text">
                        {DataSource.maxheal}
                    </span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...getSelectedData(state),
        chartView: state.chartView,
        showDetails: state.showDetails
    }
}

export default connect(
    mapStateToProps,
    null,
    null,
    {pure: false}
)(EncounterStats)
