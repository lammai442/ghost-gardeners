import { v4 as uuid } from 'uuid';

export const generateDate = () => {
    return new Date().toISOString();
};

export const generateId = (prefix) => {
    return `${prefix}-${uuid().substring(0, 5)}`;
};
