import React, {useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

export const ToastContext = React.createContext({
    config: null,
    addConfig: () => {},
    removeConfig: () => {}
});
export const ToastProvider = ({children}) => {
    const [config, setConfig] = useState(null);

    const removeConfig = () => setConfig(null);
    const addConfig = (success, message) => setConfig({ success, message });

    const contextValue = {
        config,
        addConfig: (success, message) => addConfig(success, message),
        removeConfig: () => removeConfig()
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'left'}} open={!!config} autoHideDuration={1500} onClose={removeConfig}>
                <Alert onClose={removeConfig} severity={!!config ? (config.success ? "success" : "error") : ""}>
                    {!!config && config.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}