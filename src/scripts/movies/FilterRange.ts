type TFilterRangeConstructor = {
    parentRange: Element,
    infoMin: HTMLInputElement,
    infoMax: HTMLInputElement,
    rangeMin: HTMLInputElement,
    rangeMax: HTMLInputElement
};

export default class FilterRange implements TFilterRangeConstructor {
    parentRange: Element;

    infoMin: HTMLInputElement;

    infoMax: HTMLInputElement;

    rangeMin: HTMLInputElement;

    rangeMax: HTMLInputElement;

    constructor(blockId:string) {
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

    handleRange = (): void => {
        let rangeMinValue = Number(this.rangeMin.value);
        let rangeMaxValue = Number(this.rangeMax.value);
        if (rangeMinValue > rangeMaxValue) {
            [rangeMinValue, rangeMaxValue] = [rangeMaxValue, rangeMinValue];
        }
        this.infoMin.value = rangeMinValue.toLocaleString('en-US');
        this.infoMax.value = rangeMaxValue.toLocaleString('en-US');
    };

    handleInfo = (event: Event & { target: HTMLInputElement }): void => {
        const input: HTMLInputElement = event.target;
        input.value = this.formatValue(input.value);
        this.rangeMin.value = this.deleteNotNumber(this.infoMin.value);
        this.rangeMax.value = this.deleteNotNumber(this.infoMax.value);
    };

    formatValue = (value): string => {
        const newValue: string = this.deleteNotNumber(value);
        const newValueParse: number = newValue ? parseInt(newValue, 10) : 0;
        return newValueParse.toLocaleString('en-US');
    };

    deleteNotNumber = (string:string): string => string.replace(/[\D\s._-]+/g, '');
}
