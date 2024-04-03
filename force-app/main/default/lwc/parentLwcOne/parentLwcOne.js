import { LightningElement ,track} from 'lwc';
export default class ParentLwcOne extends LightningElement {

    @track value=0;

    handleChange(event)
    {
        const inputValue = parseInt(event.target.value);
        this.value = isNaN(inputValue) ? 'NaN' : inputValue;
    }
}