export default class FilterRange {
    constructor(blockId) {
        this.parentRange = document.querySelector(`#${blockId}`);
        this.infoMin = this.parentRange.querySelector('input[id$="-min"]');
        this.infoMax = this.parentRange.querySelector('input[id$="-max"]');
        this.rangeMin = this.parentRange.querySelector('input[id$="-min-range"]');
        this.rangeMax = this.parentRange.querySelector('input[id$="-max-range"]');

        this.rangeMin.addEventListener('input', this.handleRange);
        this.rangeMax.addEventListener('input', this.handleRange);
        this.infoMin.addEventListener('input', this.handleInfo);
        this.infoMax.addEventListener('input', this.handleInfo);
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

    handleInfo = (event) => {
        const input = event.target;
        input.value = this.formatValue(input.value);
        this.rangeMin.value = this.deleteNotNumber(this.infoMin.value);
        this.rangeMax.value = this.deleteNotNumber(this.infoMax.value);
    };

    formatValue = (value) => {
        let newValue = this.deleteNotNumber(value);
        newValue = newValue ? parseInt(newValue, 10) : 0;
        return newValue.toLocaleString('en-US');
    };

    deleteNotNumber = (string) => string.replace(/[\D\s._-]+/g, '');
}
