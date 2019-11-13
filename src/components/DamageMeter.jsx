import React, { Component } from 'react'
import Header from './Header';
import Combatants from './Combatants';
import Debugger from './Debugger';
import {sortBy, filter} from 'lodash'

var EncountersArray = []

export default class DamageMeter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewIndex: 0,
            data: {}
        };
    }

    componentDidMount() {
        // pass this into a redux store so i can build graphs and such
        document.addEventListener('onOverlayDataUpdate', this.onOverlayDataUpdate);
        document.addEventListener("onOverlayStateUpdate", this.onOverlayStateUpdate)
        document.addEventListener("message", this.onOverlayMessage)
    }
       
    onOverlayDataUpdate = (update) => {
        this.setState( { data: update.detail } )
    }

    onOverlayStateUpdate(update){
        // console.log(update.detail)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.data.Encounter.encdps === '---') {
            return false;
        }

        if (this.state.currentViewIndex !== nextState.currentViewIndex) {
            return true;
        }

        if (this.state.selectedEncounter) {
            return false;
        }

        return true;
    }

    componentWillReceiveProps(nextProps) {
        // save this encounter data
        // if (this.props.parseData.Encounter.title === 'Encounter' &&
        //     nextProps.parseData.Encounter.title !== 'Encounter') {
        //     EncountersArray.unshift({
        //         Encounter: nextProps.parseData.Encounter,
        //         Combatant: nextProps.parseData.Combatant
        //     });

        //     // Only keep the last 10 fights
        //     if (EncountersArray.length > 10) {
        //         EncountersArray.pop();
        //     }
        // }
    }

    handleCombatRowClick(e) {
    }

    handleClick(e) {
    }

    handleViewChange(e) {
        var index = this.state.currentViewIndex;

        if (index > this.props.chartViews.length-2) {
            index = 0;
        }
        else {
            index++;
        }

        this.setState({
            currentViewIndex: index
        });

    }

    handleSelectEncounter(index, e) {
        if (index >= 0) {
            this.setState({
                selectedEncounter: EncountersArray[index]
            });
        }
        else {
            this.setState({
                selectedEncounter: null
            });
        }
        this.render();
        console.log('handle select', index);
    }

    render() {
        const debug = false;

        var combatants = this.state.data.Combatant; 
        var encounterData = this.state.data.Encounter;

        if (this.state.selectedEncounter) {
            combatants = this.state.selectedEncounter.Combatant;
            encounterData = this.state.selectedEncounter.Encounter;
        }
        else {
            // Healing
            // need to resort data if currentView is not damage
            if (this.state.currentViewIndex === 1) {
                combatants = sortBy(filter(combatants, (d) => {
                    return parseInt(d.healed, 10) > 0;
                }), (d) => {
                    if (this.state.currentViewIndex === 1) {
                        return -parseInt(d.healed, 10);
                    }
                });
            }
            // Tanking
            else if (this.state.currentViewIndex === 2) {
                combatants = sortBy(filter(combatants, (d) => {
                    return parseInt(d.damagetaken, 10) > 0;
                }), (d) => {
                    if (this.state.currentViewIndex === 2) {
                        return -parseInt(d.damagetaken, 10);
                    }
                });
            }
        }

        return (
            <div
                onClick={this.handleClick}
                className={'damage-meter' + (!this.props.parseData.isActive ? ' inactive' : '') + (!this.props.noJobColors ? ' show-job-colors' : '')}>
                <Header
                    encounter={encounterData}
                    data={combatants}
                    onViewChange={this.handleViewChange.bind(this)}
                    onSelectEncounter={this.handleSelectEncounter.bind(this)}
                    currentView={this.props.chartViews[this.state.currentViewIndex]}
                    />
                {
                    encounterData && encounterData.damage ? 
                    <Combatants
                        currentView={this.props.chartViews[this.state.currentViewIndex]}
                        onClick={this.handleCombatRowClick}
                        data={combatants}
                        encounterDamage={encounterData.damage} />
                    : null
                }
                {
                  !debug ? null :
                  <div>
                    <Debugger data={this.props.data}/>
                  </div>
                }
            </div>
        );
    }
}
DamageMeter.defaultProps = {
    chartViews: [
        'Damage',
        'Healing',
        'Tanking'
    ],
    parseData: {},
    noJobColors: false
};