import React, { Component } from 'react'
import Jobs from '../utils/jobs'
export default class CombatantCompact extends Component {
    jobImage(job) {
        return Jobs[job.toLowerCase()];
    }

    render() {
        //var width = parseInt(this.props.data.damage / this.props.encounterDamage * 100, 10) + '%';
        var width = Math.min(100, parseInt(this.props.total / this.props.max * 100, 10)) + '%';

        return (
            this.props.perSecond === '---' ? null :
            <li
                className={'row ' + this.props.job.toLowerCase() + (this.props.isSelf ? ' self' : '')}
                onClick={this.props.onClick}>
                <div
                    className='bar'
                    style={{width: width}} />
                    
                    <div className="text-overlay">
                        <div className="stats">
                            <span className="total">
                                {this.props.totalFormatted}
                            </span>

                            {this.props.additional ?
                            <span className="additional">
                                [{this.props.additional}]
                            </span> : null }

                            (
                                <span className="ps">
                                    {this.props.perSecond},
                                </span>

                                <span className="percent">
                                    {this.props.percentage}
                                </span>
                            )
                        </div>

                        <div className="info">
                            <span className='job-icon'>
                                <img src={Jobs[this.props.job.toLowerCase()]} alt={this.props.job}/>
                            </span>
                            <span className="rank">
                                {this.props.rank}.
                            </span>
                            <span className="character-name">
                                {this.props.characterName}
                            </span>
                            <span className="character-job">
                                {this.props.job}
                            </span>
                        </div>
                    </div>
            </li>
        );
    }
}
CombatantCompact.defaultProps = {
    onClick() {}
};