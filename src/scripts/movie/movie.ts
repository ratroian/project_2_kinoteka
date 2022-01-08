import { domElements } from './global-var';
import { handleLoadWindow, handleLogOut } from './listeners';

domElements.logOutBtn.addEventListener('click', handleLogOut);
window.addEventListener('load', handleLoadWindow);
