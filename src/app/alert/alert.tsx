import React from "react";
import {ALL_ALERTS} from "../app.alerts";

const Alert = ({ currentPath, children }: { currentPath: string, children?: any }) => {
    try {
        const alert = ALL_ALERTS[currentPath];

        if (!alert) {
            return children ? <div className="alert">{children}</div> : null;
        }

        return (
            <div className="alert">{alert}</div>
        );
    } catch (e) {
        return null;
    }
}

export default Alert;