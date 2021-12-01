export const clearPagesFromLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('page')) {
            localStorage.removeItem(key);
            i--;
        }
    }
}

export const savePageToLocalStorage = (key, value) => {
    localStorage.setItem(`page${key}`, JSON.stringify(value));
}

export const loadPageFromLocalStorage = (page) => {
    return JSON.parse(localStorage.getItem(`page${page}`));
}

export const runtimeFormatting = (runtime) => {
    if (typeof runtime !== 'number' || !isFinite(runtime) || runtime < 1) return 'null';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;
    return `${hours}h ${minutes}m`;
}

export const rateFormatting = (rate) => {
    if (rate === null) return 'NR';
    return rate;
}

export const rateState = (rate) => {
    if (rate === null) return 'bad-rate';
    rate = Number(rate);
    if (!isFinite(rate) || rate < 7) return 'bad-rate';
    return 'good-rate';
}