import flatpickr from 'flatpickr';
import { domElements } from './global-var';
import 'flatpickr/dist/themes/light.css';
import '../../styles/restyle-flatpickr.css';

flatpickr(domElements.releaseDateFirst, {
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d',
});
flatpickr(domElements.releaseDateLast, {
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d',
});

const toggleClassFilters = () => {
    domElements.filterModalBox.classList.toggle('active');
    domElements.filterModalBox.classList.toggle('hide');
    document.body.classList.toggle('scroll-hidden');
};

const hideFilters = (event) => {
    const conditionKeydown = event.type === 'keydown' && event.code === 'Escape';
    const conditionClick = event.type === 'click' && event.target.id === 'filters-modal';

    if (conditionKeydown || conditionClick) {
        toggleClassFilters();
        window.removeEventListener('keydown', hideFilters);
        domElements.filterModalBox.removeEventListener('click', hideFilters);
    }
};

const handleFilters = () => {
    toggleClassFilters();
    window.addEventListener('keydown', hideFilters);
    domElements.filterModalBox.addEventListener('click', hideFilters);
};

export default handleFilters;
