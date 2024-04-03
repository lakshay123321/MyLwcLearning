import { LightningElement } from 'lwc';

export default class ChildLwc extends LightningElement {
    handleAdd()
    {
        this.dispatchEvent(new CustomEvent('add'));
    }

    handleSubstract()
    {
        this.dispatchEvent(new CustomEvent('subtract'));
    }

    handleMultiply(event)
    {
        const multipleValue = event.target.value;
        this.dispatchEvent(new CustomEvent('multiply',{
            detail:multipleValue
        }));
    }
}