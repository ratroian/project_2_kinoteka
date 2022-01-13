export const form: HTMLFormElement = document.querySelector('#filters');
export const disabledButton: HTMLButtonElement = document.querySelector('#reset-btn');
export const filterButton: HTMLButtonElement = document.querySelector('#filter-btn');
export const formItems: NodeListOf<HTMLFormElement> = form.querySelectorAll('[data-url]');
