const TOKEN_KEY = 'token';

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const saveToken = (value: string) => {
    localStorage.setItem(TOKEN_KEY, value);
};

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export { getToken, saveToken, removeToken };
