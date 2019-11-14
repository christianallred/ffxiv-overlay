import { hanldeInjest, handleStateChange } from './store'

export default (dispatch, getState) => {
    const onOverlayDataUpdate = (update) => {
        dispatch(hanldeInjest(update.detail))
    }
    
    const onOverlayStateUpdate = (update) => { 
        dispatch(handleStateChange(update.detail))
    }

    const onOverlayMessage = (update) => {
        return update;
    }

    document.addEventListener('onOverlayDataUpdate', onOverlayDataUpdate);
    document.addEventListener("onOverlayStateUpdate", onOverlayStateUpdate);
    document.addEventListener("message", onOverlayMessage)
}

