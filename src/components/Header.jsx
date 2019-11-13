import React, { Component } from 'react'
var EncountersArray = [];

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            group: true,
            showEncountersList: false
        };
    }

    shouldComponentUpdate(nextProps) {
        // WIll need to add a null check here if we are swapping betwen self and group.
        if (nextProps.encounter.encdps === '---') {
            return false;
        }
        return true;
    }

    handleExtraDetails(e) {
        this.props.onExtraDetailsClick(e);

        this.setState({
            expanded: !this.state.expanded
        });
    }

    /**
     * Show dropdown for list of encounters
     */
    handleEncounterClick(e) {
        this.setState({
            showEncountersList: !this.state.showEncountersList
        });
    }

    /**
     * Toggle between group and indidivual stats.
     */
    handleToggleStats(e){
      this.setState({
        group: !this.state.group
      })
    }

    render() {
        var data = this.props.data;
        var encounter = this.props.encounter;
        
        // need to fix this
        if (!data){
            return <div></div>
        }

        var self = data['YOU'];
        var rdps = parseFloat(encounter.encdps);
        var rdps_max = 0;
        if (!isNaN(rdps) && rdps !== Infinity) {
            rdps_max = Math.max(rdps_max, rdps);
        }

        // This is the switcher for Toggling group info or self info
        var DataSource = this.state.group ? encounter : self;
        if (self == undefined){
          DataSource = encounter;
        }
        
        // Calculate the drect hit % based off of the combatant list. This is not efficient and needs to be removed
        // Once the encounter object is fixed to properly include this info.
        var datalength = 0;
        var DirectHitPct = 0
        var CritDirectHitPct = 0;
        if (this.state.group){
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
          if (self != undefined){
            DirectHitPct = self.DirectHitPct;
            CritDirectHitPct = self.CritDirectHitPct;
          }
        }

        return (
            <div className={`header ${this.state.expanded ? '' : 'collapsed'}`}>
                <div className="encounter-header">
                    <div className="encounter-data ff-header">
                        <span className="target-name dropdown-parent" onClick={this.handleEncounterClick.bind(this)}>
                            {encounter.title}
                            <div className={`dropdown-menu encounters-list-dropdown ${this.state.showEncountersList ? '' : 'hidden'}`}>
                                <div onClick={this.props.onSelectEncounter.bind(this, null)}>
                                    Current Fight
                                </div>
                                {this.props.encounters.map(function(encounter, i) {
                                    return (
                                        <div key={i} onClick={this.props.onSelectEncounter.bind(this, i)}>
                                            {encounter.Encounter.title}
                                        </div>
                                    );
                                }.bind(this))}
                            </div>
                        </span>
                        <span className="duration">
                            ({encounter.duration})
                        </span>
                        <span className={`arrow ${this.state.expanded ? 'up' : 'down'}`} onClick={this.handleExtraDetails.bind(this)} />
                    </div>
                    <div
                        className="chart-view-switcher"
                        onClick={this.props.onViewChange}>
                        {this.props.currentView}
                    </div>
                </div>
                <div className="extra-details">
                    {
                        this.props.currentView == "Damage" ?
                        <div className="data-set-view-switcher clearfix" onClick={this.handleToggleStats.bind(this)}>
                            <span className={`data-set-option ${this.state.group ? 'active' : ''}`}>G</span>
                            <span className={`data-set-option ${!this.state.group ? 'active' : ''}`}>I</span>
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
            </div>
        );
    }
}
Header.defaultProps = {
    encounter: {},
    onViewChange() {},
    onSelectEncounter() {},
    onExtraDetailsClick() {}
};



// // fiddle: http://jsfiddle.net/v1ddnsvh/8/
// /* global window */
// // If you need a handy tool to transpile your JSX: https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&code_lz=Q
// var IMAGE_PATH = 'images';
// var EncountersArray = [];

// var React = window.React;

var formatNumber = (number) => {
    number = parseFloat(number, 10);

    if (number >= 1000) {
        return (number / 1000).toFixed(2) + 'K';
    }
    else if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + 'M';
    }

    return number.toFixed(2);
};




