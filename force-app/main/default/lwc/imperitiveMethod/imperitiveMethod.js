import { LightningElement ,track} from 'lwc';
import getContactList from '@salesforce/apex/ContactInfo.getContactList';

const columns =[
    {label : 'Contact Record Id' , fieldName : 'Id'},
    {label : 'Contact Name' , fieldName : 'Name'}
];
export default class ImperitiveMethod extends LightningElement {
    @track columns =columns;
    @track data = [];
    @track error ;

    connectedCallback()
    {
        getContactList()
            .then(result=>
                {
                    this.data=result;
                })
            .catch(error=>{
                this.error = error;
            })     
    }

}