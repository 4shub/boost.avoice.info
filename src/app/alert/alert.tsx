import React from "react";
import {getCurrentPath} from "../app.helpers";
import {ALL_ALERTS} from "../app.alerts";

const Alert = ({ currentPath }: { currentPath: string }) => {
    try {
        const alert = ALL_ALERTS[currentPath];

        if (!alert) {
            return null;
        }

        return (
            <div className="alert">UPDATE: All four officers involved with George Floyd's murder have been charged, and the case has moved to the Minnesota Attorney General.</div>
        );
    } catch (e) {
        return null;
    }
}

export default Alert;