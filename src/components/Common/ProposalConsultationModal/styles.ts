import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
    modalContent: {
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            borderRadius: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: '8px'
        }
    },
    dialogActionWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    wrapper: {
        fontFamily: `"Times New Roman", sans-serif`,
        padding: '0px 48px'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fieldItem: {
        display: 'flex',
        alignItems: 'end',
        gap: '5px',
        width: '100%'
    },
    textData: {
        position: 'relative',
        width: '100%',
        minHeight: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '2px',
        overflowWrap: 'break-word',
        '&::after': {
            position: 'absolute',
            content: '""',
            width: '100%',
            bottom: '6px',
            height: '1px',
            backgroundImage:
                'linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%)',
            backgroundPosition: 'bottom',
            backgroundSize: '3px 1px',
            backgroundRepeat: 'repeat-x'
        }
    }
}));

export const InputProps = {
    sx: {
        outline: 'none',
        marginBottom: '5px',
        textTransform: 'uppercase',
        '& input': {
            padding: 0,
            position: 'absolute',
            top: '-18px'
        },
        '& textarea': {
            marginBottom: '0px',
            padding: 0,
            position: 'absolute',
            top: '-18px'
        },
        '& select': {
            padding: 0
        },
        '&::after': {
            borderBottom: 'none'
        },
        '&::before': {
            position: 'unset',
            display: 'none'
        }
    }
};

export const InputPropsTextarea = {
    sx: {
        outline: 'none',
        marginBottom: '-5px',
        '& textarea': {
            marginBottom: '0px',
            padding: 0
        },
        '&::after': {
            borderBottom: 'none'
        },
        '&::before': {
            position: 'unset',
            display: 'none'
        }
    }
};

export const InputLabelProps = {
    shrink: false,
    sx: {
        opacity: 0
    }
};

export const FormHelperTextProps = {
    sx: {
        position: 'absolute',
        bottom: '-20px'
    }
};

export default useStyles;
