import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
    noImageContainer: {
        position: 'relative',
        borderRadius: '10px',
        borderStyle: 'dashed',
        borderColor: 'gray',
        width: '100%',
        '&::after': {
            content: '""',
            display: 'block',
            paddingBottom: '100%'
        }
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        '&::after': {
            content: '""',
            display: 'block',
            paddingBottom: '100%'
        }
    },
    noImageBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        color: 'gray'
    },
    avatar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '50%'
    },
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
    }
}));

export const InputLabelProps = {
    shrink: true,
    sx: {
        opacity: 1
    }
};

export default useStyles;
