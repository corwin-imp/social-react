const getRandomId = () => (Date.now() + Math.random()).toString();
const randomId = (store:any) => (next:any) => (action:any) => {
    const { payload = {} } = action;
    const { generateId, ...rest } = payload;
    if (!generateId) return next(action);
    next({
        ...action,
        payload: {
            ...rest,
            randomId: getRandomId(),
        },
    });
};
export default randomId;
