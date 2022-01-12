import { domElements } from './global-var';
import { CLASS_HIDDEN } from '../constants';

export const removePageLoader = (): void => {
    domElements.loaderFullScreen.classList.toggle(CLASS_HIDDEN);
};
