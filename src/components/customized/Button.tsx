import React, { ReactElement } from "react";
import { Button } from "zmp-ui";
import { ButtonProps } from "zmp-ui/button";

export const IconButtonWithLabel: React.FC<
    {
        icon: ReactElement;
        label: string;
    } & Pick<ButtonProps, "onClick">
> = ({ icon, label, onClick }) => (
    <div className="icon-button-with-label">
        <Button 
            icon={icon} 
            onClick={onClick} 
            className="icon-button"
        />
        <div className="icon-button-label">{label}</div>
    </div>
);

const AppButton: React.FC<ButtonProps> = (props) => {
    const { className = "", ...otherProps } = props;
    return (
        <Button 
            {...otherProps}
            className={`app-button ${className}`}
        />
    );
};

export default AppButton;
