import React, { Component } from 'react'
import Header from './Header';
import Combatants from './Combatants';
import Debugger from './Debugger';
import {sortBy, filter, concat} from 'lodash'
import classnames from 'classnames';

var EncountersArray = []

export default class DamageMeter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewIndex: 0,
            data: {},
            isLocked: false,
            Encounters: [],
            selectedEncounter: null 
        };
    }

    componentDidMount() {
        // pass this into a redux store so i can build graphs and such

        // I need to connect these listeners to teh store ...
        document.addEventListener('onOverlayDataUpdate', this.onOverlayDataUpdate);
        document.addEventListener("onOverlayStateUpdate", this.onOverlayStateUpdate);
        document.addEventListener("message", this.onOverlayMessage)
    }
       
    onOverlayDataUpdate = (update) => {
        this.setState( { data: update.detail } )
    }

    onOverlayStateUpdate = (update) => {
        this.setState({ isLocked: update.detail.isLocked })
    }

    onOverlayStateUpdate( update ){
        // console.log(update.detail)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // TODO: move this to a store. ... i should move all of this to a store. 
        if (this.state.data && this.state.data.Encounter && this.state.data.Encounter.title === 'Encounter' &&
            nextState.data.Encounter.title !== 'Encounter') {
            const newEncs = concat(
                [{
                    Encounter: nextState.data.Encounter,
                    Combatant: nextState.data.Combatant
                }],
                this.state.Encounters
            )
            if (newEncs.length > 15){
                newEncs.pop();
            }

            this.setState({Encounters: newEncs})
        }
        return true
    }

    handleCombatRowClick(e) {
        // TODO: build teh combat stats ui per user. 

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
        console.log('handle select', index);
        if (index >= 0) {
            this.setState({
                selectedEncounter: index 
            });
        }
        else {
            this.setState({
                selectedEncounter: null
            });
        }
    }

    render() {
        console.log(this.state)
        console.log(this.state.Encounters.map(item => item.Encounter.title))
        const debug = false;

        var combatants = this.state.data.Combatant; 
        var encounterData = this.state.data.Encounter;

        if (this.state.selectedEncounter !== null) {
            console.log('selected')
            const index = this.state.selectedEncounter;
            combatants = this.state.Encounters[index].Combatant;
            encounterData = this.state.Encounters[index].Encounter;
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
                className={classnames({
                    'damage-meter':true,
                    'inactive': !this.props.parseData.isActive, 
                    'show-job-colors': !this.props.noJobColors,
                    'resizable': !this.state.isLocked,
                })}>
                <Header
                    encounter={encounterData}
                    data={combatants}
                    onViewChange={this.handleViewChange.bind(this)}
                    onSelectEncounter={this.handleSelectEncounter.bind(this)}
                    currentView={this.props.chartViews[this.state.currentViewIndex]}
                    encounters={this.state.Encounters}
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