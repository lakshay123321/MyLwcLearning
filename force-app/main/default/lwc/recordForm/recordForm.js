import { LightningElement , track ,api} from 'lwc';
import Accountinfo from '@salesforce/schema/Account';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import Name from '@salesforce/schema/Account.Name';
import AnnualRevenue from '@salesforce/schema/Account.AnnualRevenue';
export default class RecordForm extends LightningElement {
    @track fields =[Name,AnnualRevenue];
   @track objectName=Accountinfo;
    @api recordId;
    handleSubmit()
    {
        const event = new ShowToastEvent({
            title:'Submitted',
            message:'This form is Submitted',
            variant:'success'
        })
        this.dispatchEvent(event);    
    }
}