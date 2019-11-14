import React from 'react'
import { connect } from 'react-redux'
import EncounterList from '../EncounterList/'
import EncounterStats from '../EncounterStats/'
import {
    hanldeChartViewChange,
    hanldeToggleShowDetails
} from '../../store/store'

import './style.scss'

const Header = (props) => {
    return (
        <div className="header">
            <div className="encounter-header">
                <div>
                    <EncounterList />
                </div>
                <div>
                    <div className="button arrow"
                        onClick={props.hanldeToggleShowDetails}>
                        {props.showDetails ? <span>&#8593;</span> : <span>&#8595;</span>} 
                    </div>
                    <div className={`button chart-view-switcher ${props.chartView}`} 
                        onClick={props.hanldeChartViewChange}>
                        {props.chartView}
                    </div>
                </div>
            </div>
            <EncounterStats />
        </div>
    );
}

const mapDispatchToProps = {
    hanldeChartViewChange,
    hanldeToggleShowDetails
}

const mapStateToProps = (state) => {
    return {
        Encounters: state.Encounters,
        showDetails: state.showDetails,
        chartView: state.chartView
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {pure: false}
)(Header)




