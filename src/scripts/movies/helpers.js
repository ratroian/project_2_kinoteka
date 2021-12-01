export function clearPagesFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('page')) {
            localStorage.removeItem(key);
            i--;
        }
    }
}

export function savePageToLocalStorage(key, value) {
    localStorage.setItem(`page${key}`, JSON.stringify(value));
}