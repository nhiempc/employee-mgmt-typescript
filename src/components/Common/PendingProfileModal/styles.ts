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
        },
        paddingTop: 0
    },
    dialogActionWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    leftWrapper: {
        backgroundColor: `${process.env.REACT_APP_THEME_COLOR}`,
        color: 'white',
        position: 'sticky',
        height: '83vh',
        top: 0
    },
    FormLabel: {
        color: `${process.env.REACT_APP_THEME_COLOR}`
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
    avatar: {
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        right: 0,
        bottom: 0,
        width: '90%',
        height: '90%',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '50%'
    },
    header: {
        textAlign: 'center'
    },
    position: {
        fontWeight: 'normal'
    },
    basicInfo: {
        padding: 16
    },
    titleInfo: {
        textTransform: 'uppercase',
        fontWeight: 'normal',
        padding: '10px 0'
    },
    basicInfoItem: {
        display: 'flex',
        gap: '10px',
        padding: '10px 0',
        alignItems: 'center'
    },
    rightWrapper: {
        padding: 16
    },
    titleWrapper: {
        textTransform: 'uppercase',
        display: 'flex',
        gap: '10px',
        padding: '5px 0',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: `${process.env.REACT_APP_THEME_COLOR}`
    },
    careerGoalTitle: {
        fontWeight: 'bold'
    },
    workExperiencesTitle: {
        fontWeight: 'bold'
    },
    careerGoalWrapper: {
        paddingBottom: '20px'
    },
    timeWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15
    },
    workItem: {
        padding: '16px 0 16px 16px'
    },
    workDetailWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15
    },
    resumeHeader: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resumeTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '30px',
        position: 'absolute',
        width: '100%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    resumeWrapper: {
        fontFamily: `"Times New Roman", sans-serif`,
        padding: '0px 80px 16px 80px',
        borderLeft: '1px solid #d0d0d0',
        borderRight: '1px solid #d0d0d0'
    },
    cvWrapper: {
        borderLeft: '1px solid #d0d0d0',
        borderRight: '1px solid #d0d0d0'
    },
    avatarWrapper: {
        position: 'relative'
    },
    resumeAvatar: {
        width: '120px',
        height: '160px',
        lineHeight: '160px',
        border: '1px solid black',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '20px',
        textAlign: 'center'
    },
    fieldItem: {
        display: 'flex',
        alignItems: 'end',
        gap: '10px'
    },
    textData: {
        position: 'relative',
        width: '100%',
        minHeight: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '2px',
        '&::after': {
            position: 'absolute',
            content: '""',
            width: '100%',
            bottom: '6px',
            height: '1px',
            borderBottom: '1px dotted black'
        }
    },
    workExperiencesWrapper: {
        paddingBottom: '20px'
    },
    noInfoBox: {
        minHeight: '100px',
        display: 'flex',
        paddingLeft: '20px',
        justifyContent: 'left',
        alignItems: 'center',
        border: '1px solid #d0d0d0'
    },
    td: {
        border: '1px solid black',
        borderCollapse: 'collapse',
        padding: '5px 10px'
    },
    th: {
        border: '1px solid black',
        borderCollapse: 'collapse',
        padding: '5px 10px'
    },
    table: {
        width: '100%',
        border: '1px solid black',
        borderCollapse: 'collapse',
        marginTop: '8px'
    },
    timeLine: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '5px',
        fontSize: '14px',
        fontWeight: '500'
    },
    workPosition: {
        fontWeight: '600'
    },
    company: {
        padding: '4px 0!important'
    },
    detail: {
        padding: '4px 0!important'
    }
}));

export const InputProps = {
    sx: {
        borderBottom: '1px dotted black',
        outline: 'none',
        paddingBottom: '0px',
        marginBottom: '5px',
        textTransform: 'uppercase',
        '&:disabled': {
            webkitTextFillColor: 'black!important'
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

export const FormHelperTextProps = {
    sx: {
        position: 'absolute',
        bottom: '-20px'
    }
};

export const InputLabelProps = {
    shrink: false,
    sx: {
        opacity: 0
    }
};

export default useStyles;
