import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Input } from "zmp-ui";
import { InputProps, InputRef, TextAreaProps, TextAreaRef } from "zmp-ui/input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AppInput: React.FC<InputProps> = forwardRef((props, ref) => {
    const inputRef = useRef<InputRef>(null);
    useImperativeHandle(ref, () => inputRef.current?.input);
    
    const { className = "", type, suffix, ...otherProps } = props;
    const [showPassword, setShowPassword] = useState(false);
    
    // Auto-generate password toggle for password inputs
    const isPasswordInput = type === "password";
    const actualType = isPasswordInput ? (showPassword ? "text" : "password") : type;
    
    const passwordToggleIcon = isPasswordInput ? (
        <span 
            className="password-toggle-icon cursor-pointer select-none flex items-center justify-center"
            onClick={() => setShowPassword(!showPassword)}
        >
            <div className="pe-2">
            {showPassword ? 
                <AiOutlineEyeInvisible size={25} /> : 
                <AiOutlineEye size={25} />
            }
            </div>

        </span>
    ) : null;
    
    // Use provided suffix or password toggle, with priority to provided suffix
    const finalSuffix = suffix || passwordToggleIcon;
    
    return (
        <Input 
            {...otherProps}
            type={actualType}
            suffix={finalSuffix}
            ref={inputRef}
            className={`app-input ${className}`}
        />
    );
});

export const TextArea: React.FC<TextAreaProps> = forwardRef((props, ref) => {
    const inputRef = useRef<TextAreaRef>(null);
    useImperativeHandle(ref, () => inputRef.current?.textarea);
    
    const { className = "", ...otherProps } = props;
    return (
        <Input.TextArea 
            {...otherProps}
            ref={inputRef}
            className={`app-textarea ${className}`}
        />
    );
});

export default AppInput;
