import React from "react";
import { Checkbox } from "zmp-ui";
import { CheckboxProps } from "zmp-ui/checkbox";

const AppCheckbox: React.FC<CheckboxProps> = (props) => {
    const { className = "", ...otherProps } = props;
    return (
        <Checkbox 
            {...otherProps}
            className={`app-checkbox ${className}`}
        />
    );
};

export default AppCheckbox;
