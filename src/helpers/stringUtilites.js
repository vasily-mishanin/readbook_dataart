export const shortenString = (str, limitLength) => (str && str.length > limitLength ? `${str.slice(0, limitLength)}...` : str);
