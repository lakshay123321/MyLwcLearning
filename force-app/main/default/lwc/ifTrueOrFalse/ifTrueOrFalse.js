import { LightningElement ,track } from 'lwc';

export default class IfTrueOrFalse extends LightningElement {

    @track label = 'Show';
    @track visible = false;
    clickHandle(event)
    {
        const labelName = event.target.label;
        if(labelName === 'Show')
        {
            this.label='Hide';
            this.visible=true;
        }
        else if(labelName === 'Hide')
        {
            this.label='Show';
            this.visible=false;
        }
    }
}