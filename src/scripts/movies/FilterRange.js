export default class FilterRange {
    constructor(blockId) {
        this.parentRange = document.querySelector(`#${blockId}`);
        this.infoMin = this.parentRange.querySelector('input[id$="-min"]');
        this.infoMax = this.parentRange.querySelector('input[id$="-max"]');
        this.rangeMin = this.parentRange.querySelector('input[id$="-min-range"]');
        this.rangeMax = this.parentRange.querySelector('input[id$="-max-range"]');

        this.rangeMin.addEventListener('input', this.handleRange);
        this.rangeMax.addEventListener('input', this.handleRange);
        this.handleRange();
    }

    handleRange = () => {
        let rangeMinValue = Number(this.rangeMin.value);
        let rangeMaxValue = Number(this.rangeMax.value);
        if (rangeMinValue > rangeMaxValue) {
            [rangeMinValue, rangeMaxValue] = [rangeMaxValue, rangeMinValue];
        }
        this.infoMin.value = this.formatNumber(rangeMinValue);
        this.infoMax.value = this.formatNumber(rangeMaxValue);
    };

    // eslint-disable-next-line class-methods-use-this
    formatNumber = (number) => {
        number = String(number).split('').reverse();
        return number.map((digit, index) => (index % 3 === 0 ? `${digit} ` : digit))
            .reverse().join('');
    };
}
