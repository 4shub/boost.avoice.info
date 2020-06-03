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
            <div className="alert">UPDATE: Some emails may not send as Minneapolis servers experience disruption.</div>
        );
    } catch (e) {
        return null;
    }
}

export default Alert;