export const getDate = (timestamp: Date) => {
    return new Date(timestamp).toLocaleDateString('fa-IR').replace(/\//g, '-');
};