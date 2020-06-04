import React from 'react';
import { SendEmailToSelectorProps } from './send-email-to-selector.types';

const SendEmailToSelector = (props: SendEmailToSelectorProps) => {
    const { emailList, onChange, selectedValue } = props;
    const useDropdown = emailList.length > 5;

    const Option = ({ value, title }) => {
        if (useDropdown) {
            return (
                <option value={value} selected={selectedValue === value}>
                    {title}
                </option>
            );
        }

        return (
            <label className="radio-inline">
                <input
                    aria-labelledby="send-email-to"
                    onChange={() => onChange(value)}
                    type="radio"
                    name="optradio"
                    checked={selectedValue === value}
                    value={value}
                />
                {title}
            </label>
        );
    };

    const Wrapper = ({ children }) => {
        if (useDropdown) {
            return (
                <select
                    className="input-item"
                    aria-labelledby="send-email-to"
                    onChange={({ target: { value } }) => onChange(value)}
                >
                    {!selectedValue && <option value="none">Select a recipient</option>}
                    {children}
                </select>
            );
        }

        return <React.Fragment>{children}</React.Fragment>;
    };

    return (
        <div className="preview-for">
            <Wrapper>
                {emailList.map(([key, { title }], index) => (
                    <Option key={key} value={key} title={title} />
                ))}
            </Wrapper>
        </div>
    );
};

export default SendEmailToSelector;