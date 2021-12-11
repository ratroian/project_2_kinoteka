export default class FilterRange {
    constructor(blockId) {
        this.parentRange = document.querySelector(`#${blockId}`);
        this.infoMin = this.parentRange.querySelector('input[id$="-min"]');
        this.infoMax = this.parentRange.querySelector('input[id$="-max"]');
        this.rangeMin = this.parentRange.querySelector('input[id$="-min-range"]');
        this.rangeMax = this.parentRange.querySelector('input[id$="-max-range"]');

        this.rangeMin.addEventListener('input', this.handleRange);
        this.rangeMax.addEventListener('input', this.handleRange);
        this.infoMin.addEventListener('input', this.formatInputNumber);
        this.infoMax.addEventListener('input', this.formatInputNumber);
        this.handleRange();
    }

    handleRange = () => {
        let rangeMinValue = Number(this.rangeMin.value);
        let rangeMaxValue = Number(this.rangeMax.value);
        if (rangeMinValue > rangeMaxValue) {
            [rangeMinValue, rangeMaxValue] = [rangeMaxValue, rangeMinValue];
        }
        this.infoMin.value = rangeMinValue.toLocaleString('en-US');
        this.infoMax.value = rangeMaxValue.toLocaleString('en-US');
    };

    formatInputNumber = (event) => {
        const input = event.target;
        let newValue = input.value;
        newValue = newValue.replace(/[\D\s._-]+/g, '');
        newValue = newValue ? parseInt(newValue, 10) : 0;
        input.value = newValue.toLocaleString('en-US');
    };
}
