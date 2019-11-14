import React  from 'react'
import classnames from 'classnames';
import { connect } from 'react-redux'

import Header from './Header/';
import CombatantsList from './CombatantsList/';
import CombatantDetails from './CombatantDetails/'
import {
    getSelectedData,
    getSelectedCombatant
} from '../store/store'

class DamageMeter extends React.Component {
    render() {  
        return (
            <div
                onClick={this.handleClick}
                className={classnames({
                    'damage-meter':true,
                    'resizable': true,// fix this
                })}>
                <Header />
                {this.props.SelectedCombatant ? 
                    <CombatantDetails /> :
                    <CombatantsList />}
            </div>
        );
    }
}
DamageMeter.defaultProps = {
    parseData: {},
    noJobColors: false
};


const mapStateToProps = (state /*, ownProps*/) => {
    const selectedData = getSelectedData(state);
    const SelectedCombatant = getSelectedCombatant(state);
    return {
        Combatants: selectedData.Combatant,
        Encounter: selectedData.Encounter,
        Encounters: state.Encounters,
        SelectedCombatant
    }
}

  
// const mapDispatchToProps = { increment, decrement, reset }
  
export default connect(
    mapStateToProps,
    null,
    null,
    {pure: false}
)(DamageMeter)