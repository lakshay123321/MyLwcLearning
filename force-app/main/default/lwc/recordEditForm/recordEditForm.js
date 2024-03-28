import { LightningElement,track } from 'lwc';
import objectName from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class RecordEditForm extends LightningElement {

    objectApiName = objectName;
    nameField=NAME_FIELD;
    @track value = ' Submit form to see the Account id';

    handleSuccess(event)
    {
        this.value=event.detail.id ;
        const events = new ShowToastEvent({
            title:'submitted Successfully!!!',
            message:'You have created the account record successfully!!!',
            variant:'success'
        })
        this.dispatchEvent(events);
    }
}