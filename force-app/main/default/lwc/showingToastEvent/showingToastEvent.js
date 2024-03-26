import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class ShowingToastEvent extends LightningElement {
    myTitle='Lakshay Ahuja';
    handleClick()
    {
        this.ShowToastEvent();    
    }

    ShowToastEvent()
    {
        const event = new ShowToastEvent({
            title : 'This is ShowToastEvent',
            message : 'You have successfully created a ShowToastEvent',
            variant : 'success'
        });
        this.dispatchEvent(event);
    }
}