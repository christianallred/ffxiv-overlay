import React from 'react'
import {connect} from 'react-redux'
import {hanldeCombatantSelect} from '../../store/store';
import Jobs from '../../utils/jobs'
import './style.scss'

const CombatantBar = (props) => {
    const jobImage = (job) => Jobs[job.toLowerCase()];

    var width = Math.min(100, parseInt(props.total / props.max * 100, 10)) + '%';
    if (props.perSecond === "--- ") return null;

    return <li
        className={'row ' + (props.isSelf ? ' self' : '')}
        onClick={() => props.hanldeCombatantSelect(props.characterName)}>
        <div className={'bar ' + props.job.toLowerCase() } style={{width: width}} />
        <div className="text-overlay">
            <div className="stats">
                <span className="total">
                    {props.totalFormatted}
                </span>
                {props.additional ?
                    <span className="additional">[{props.additional}]</span> 
                : null }
                (
                    <span className="ps">
                        {props.perSecond},
                    </span>
                    <span className="percent">
                        {props.percentage}
                    </span>
                )
            </div>
                
            <div className="info">
                <span className='job-icon'>
                    <img src={jobImage(props.job)} alt={props.job}/>
                </span>
                <span className="rank">
                    {props.rank}.
                </span>
                <span className="character-name">
                    {props.characterName}
                </span>
                <span className="character-job">
                    {props.job}
                </span>
            </div>
        </div>
    </li>
}

const mapDispatchToProps = {
    hanldeCombatantSelect
}
export default connect(
    null,
    mapDispatchToProps,
    null,
    {pure: false}
)(CombatantBar)