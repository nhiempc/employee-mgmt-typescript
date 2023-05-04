import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    InputLabelProps: PropTypes.object,
    size: PropTypes.string,
    select: PropTypes.bool,
    SelectProps: PropTypes.object,
    options: PropTypes.array,
    variant: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string
};

SelectField.defaultProps = {
    type: 'text',
    label: '',
    disabled: false,
    options: [
        {
            label: '',
            value: ''
        }
    ]
};

function SelectField(props: any) {
    const {
        field,
        options,
        label,
        disabled,
        fullWidth,
        InputLabelProps,
        select,
        size,
        variant,
        SelectProps,
        error,
        helperText
    } = props;
    const { name, onBlur } = field;
    const handleSelectOptionChange = (event: any) => {
        let index = event.target.selectedIndex;
        let value = event.target.options[index].value;
        let selectedValue = null;
        if (value !== '') {
            selectedValue = event ? Number(value) : null;
        } else {
            selectedValue = '';
        }
        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        };
        field.onChange(changeEvent);
    };
    return (
        <TextField
            error={error}
            helperText={helperText}
            label={label}
            fullWidth={fullWidth}
            InputLabelProps={InputLabelProps}
            size={size}
            name={name}
            disabled={disabled}
            onChange={handleSelectOptionChange}
            onBlur={onBlur}
            select={select}
            variant={variant}
            SelectProps={SelectProps}
        >
            {options.map((option: any, index: number) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </TextField>
    );
}

export default SelectField;
