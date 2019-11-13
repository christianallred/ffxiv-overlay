import React, { Component } from 'react'
import {isArray} from 'lodash'
import formatNumber from '../utils/formatter';
import CombatantCompact from './CombatantCompact'

export default class Combatants extends Component {
    shouldComponentUpdate(nextProps) {
        // if data is empty then don't re-render
        if (Object.getOwnPropertyNames(nextProps.data).length === 0) {
            return false;
        }

        return true;
    }

    render() {
        var rows = [];
        var maxRows = 12;
        var isDataArray = isArray(this.props.data);
        var dataArray = isDataArray ? this.props.data : Object.keys(this.props.data);
        var limit = Math.max(dataArray.length, maxRows);
        var names = dataArray.slice(0, maxRows-1);
        var maxdps = false;
        var combatant;
        var row;
        var isSelf;
        var rank = 1;
        var stats;

        for (var i = 0; i < names.length; i++) {
            combatant = isDataArray ? this.props.data[i] : this.props.data[names[i]];
            stats = null;

            isSelf = combatant.name === 'YOU' || combatant.name === 'You';

            if (combatant.Job !== "") {
                // should probably fix this
                if (this.props.currentView === 'Healing') {
                    if (parseInt(combatant.healed, 10) > 0) {
                        if (!maxdps) {
                            maxdps = parseFloat(combatant.healed);
                        }
                        stats = {
                            job: combatant.Job || '',
                            characterName: combatant.name,
                            total: combatant.healed,
                            totalFormatted: formatNumber(combatant.healed),
                            perSecond: formatNumber(combatant.enchps),
                            additional: combatant['OverHealPct'],
                            percentage: combatant['healed%']
                        }
                    }
                }
                else if (this.props.currentView === 'Tanking') {
                    if (parseInt(combatant.damagetaken, 10) > 0) {
                        if (!maxdps) {
                            maxdps = parseFloat(combatant.damagetaken);
                        }
                        stats = {
                            job: combatant.Job || '',
                            characterName: combatant.name,
                            total: combatant.damagetaken,
                            totalFormatted: formatNumber(combatant.damagetaken),
                            perSecond: combatant.ParryPct,
                            percentage: combatant.BlockPct
                        }
                    }
                }
                else {
                    if (!maxdps) {
                        maxdps = parseFloat(combatant.damage);
                    }
                    stats = {
                        job: combatant.Job || '',
                        characterName: combatant.name,
                        total: combatant.damage,
                        totalFormatted: formatNumber(combatant.damage),
                        perSecond: formatNumber(combatant.encdps),
                        percentage: combatant['damage%']
                    }
                }

                if (stats) {
                    rows.push(
                        <CombatantCompact
                            onClick={this.props.onClick}
                            encounterDamage={this.props.encounterDamage}
                            rank={rank}
                            data={combatant}
                            isSelf={isSelf}
                            key={combatant.name}
                            max={maxdps}
                            {...stats}
                        />
                    );
                    rank++;
                }
            }

        }

        return (
            <ul className="combatants">
                {rows}
            </ul>
        );
    }
}
Combatants.defaultProps = {
    onClick() {}
};