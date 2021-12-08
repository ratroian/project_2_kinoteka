import { domElements } from './global-var';

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
