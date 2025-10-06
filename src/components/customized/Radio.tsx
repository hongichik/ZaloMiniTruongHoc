import React from "react";
import { Radio } from "zmp-ui";
import { RadioProps } from "zmp-ui/radio";

const AppRadio: React.FC<RadioProps> = (props) => {
    const { className = "", ...otherProps } = props;
    return (
        <Radio 
            {...otherProps}
            className={`app-radio ${className}`}
        />
    );
};

export default AppRadio;
