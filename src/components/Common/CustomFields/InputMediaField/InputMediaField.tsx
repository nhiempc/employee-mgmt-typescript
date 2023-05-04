import PropTypes from 'prop-types';

InputMediaField.propTypes = {
    field: PropTypes.object.isRequired,
    hidden: PropTypes.bool,
    accept: PropTypes.string,
    type: PropTypes.string
};

InputMediaField.defaultProps = {
    type: 'file',
    hidden: false
};

type IProps = {
    field: any;
    hidden: boolean;
    accept: string;
    type: string;
};

function InputMediaField(props: IProps) {
    const { field, hidden, accept, type } = props;
    const { name, onBlur } = field;

    const handleChangeMedia = (event: any) => {
        const file = event.target.files[0];
        const fr = new FileReader();
        fr.readAsDataURL(file);

        fr.addEventListener('load', function (e: ProgressEvent<FileReader>) {
            const changeEvent = {
                target: {
                    name: name,
                    value: e.target?.result
                }
            };
            field.onChange(changeEvent);
        });
    };

    return (
        <input
            type={type}
            hidden={hidden}
            accept={accept}
            name={name}
            id={name}
            onChange={handleChangeMedia}
            onBlur={onBlur}
        />
    );
}

export default InputMediaField;
