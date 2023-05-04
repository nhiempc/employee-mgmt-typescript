import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    InputLabelProps: PropTypes.object,
    variant: PropTypes.string,
    size: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    FormHelperTextProps: PropTypes.object,
    InputProps: PropTypes.object
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    disabled: false
};

function InputField(props: any) {
    const {
        field,
        type,
        label,
        placeholder,
        disabled,
        fullWidth,
        InputLabelProps,
        variant,
        size,
        error,
        helperText,
        FormHelperTextProps,
        InputProps
    } = props;
    const { name, value, onChange, onBlur } = field;

    return (
        <TextField
            error={error}
            helperText={helperText}
            fullWidth={fullWidth}
            InputLabelProps={InputLabelProps}
            FormHelperTextProps={FormHelperTextProps}
            InputProps={InputProps}
            label={label}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            variant={variant}
            size={size}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
}

export default InputField;
