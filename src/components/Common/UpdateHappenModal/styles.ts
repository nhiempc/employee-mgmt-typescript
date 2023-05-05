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
    basicInfoTitle: {
        fontWeight: '500',
        textTransform: 'uppercase',
        padding: '16px',
        marginBottom: 0,
        borderBottom: '1px solid #d0d0d0'
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    infoWrapper: {
        padding: '16px'
    },
    listHeader: {
        width: '100%',
        color: 'white',
        backgroundColor: `${process.env.REACT_APP_THEME_COLOR}`,
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: `${process.env.REACT_APP_THEME_COLOR}`
        }
    },
    actionBtnGroup: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '8px'
    }
}));

export const InputProps = {
    sx: {
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        '&:disabled': {
            WebkitTextFillColor: 'black',
            fontSize: '14px'
        }
    }
};

export const InputLabelProps = {
    shrink: false,
    sx: {
        opacity: 0
    }
};

export default useStyles;
