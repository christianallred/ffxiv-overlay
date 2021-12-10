import { hanldeInjest } from './store'

export const handleEventsListner = (dispatch, getState) => {
    const onOverlayDataUpdate = (update) => {
        console.log(update)
        dispatch(hanldeInjest(update))
    }
    
    window.addOverlayListener('CombatData',  onOverlayDataUpdate)

    window.startOverlayEvents()
}


