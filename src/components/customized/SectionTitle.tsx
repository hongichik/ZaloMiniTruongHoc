import React from "react";
import { Text } from "zmp-ui";
import { TitleProps } from "zmp-ui/text";

const SectionTitle: React.FC<TitleProps> = (props) => {
    const { className = "", ...otherProps } = props;
    return (
        <Text.Title 
            {...otherProps}
            className={`section-title ${className}`}
        />
    );
};

export default SectionTitle;
