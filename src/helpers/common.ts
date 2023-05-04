import moment from 'moment';

export const isEmptyObject = (obj: any) => {
    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
};
export const formatDate = (value: any) => {
    if (value) {
        return moment(value).format('YYYY-MM-DD');
    } else {
        return null;
    }
};
