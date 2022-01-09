import flatpickr from 'flatpickr';
import { domElements } from './global-var';
import FilterRange from './FilterRange';
import 'flatpickr/dist/themes/light.css';
import '../../styles/restyle-flatpickr.css';

flatpickr(domElements.releaseDateFirst, {
    wrap: true,
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d',
});

flatpickr(domElements.releaseDateLast, {
    wrap: true,
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d',
});

new FilterRange('budget');
new FilterRange('popularity');
new FilterRange('revenue');

export const toggleClassFilters = (): void => {
    domElements.filterModalBox.classList.toggle('active');
    domElements.filterModalBox.classList.toggle('hide');
    document.body.classList.toggle('scroll-hidden');
};

const hideFilters = (event: KeyboardEvent & { target: HTMLElement }): void => {
    const conditionKeydown: boolean = event.type === 'keydown' && event.code === 'Escape';
    const conditionClick: boolean = event.type === 'click' && event.target.id === 'filters-modal';

    if (conditionKeydown || conditionClick) {
        toggleClassFilters();
        window.removeEventListener('keydown', hideFilters);
        domElements.filterModalBox.removeEventListener('click', hideFilters);
    }
};

const handleFilters = (): void => {
    toggleClassFilters();
    window.addEventListener('keydown', hideFilters);
    domElements.filterModalBox.addEventListener('click', hideFilters);
};

export default handleFilters;
