import { LightningElement ,track , wire} from 'lwc';
import Accountinfo from '@salesforce/apex/AccountInfo.getAccountList';
const columns = [
    {label:'Account Id' , fieldName : 'Id'},
    {label : 'Name' , fieldName : 'Name'}
]
export default class WireDecorator extends LightningElement {
    @track columns = columns;
    @track data = [];

    @wire(Accountinfo)
        getAccountInfo({data,error})
        {
            if(data)
            {
                this.data=data;
                console.log('Data received:', JSON.stringify(data));
            }
            else{
                console.log('Error found while fetching the Account Info');
            }
        }

}