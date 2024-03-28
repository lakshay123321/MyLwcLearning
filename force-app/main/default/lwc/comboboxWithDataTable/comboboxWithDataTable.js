import { LightningElement,track } from 'lwc';
import AccountInfo from '@salesforce/apex/AccountInfo.getAccountList';
import getContactList from '@salesforce/apex/AccountInfo.getContactList';
const columns = [
    {label : 'Record Id' , fieldName : 'Id'},
    {label : 'Name' , fieldName : 'Name'}
];
export default class ComboboxWithDataTable extends LightningElement {

    @track columns=columns;
    @track data = [];
    @track arrOptions = [];
    @track value='';
    visible=false;

    get options()
    {
        return this.arrOptions;
    }

    connectedCallback()
    {
        AccountInfo()
            .then(response=>{
                let arr = [];
                for(var i = 0 ; i<response.length ; i++)
                {
                    arr.push({label : response[i].Name , value : response[i].Id})
                }
                this.arrOptions=arr;
            })
    }

    handleChange(event)
    {
        this.visible=true;
        this.value=event.detail.value;
        getContactList({SelectedAccountId:this.value})
            .then(result=>{
                this.data=result
            })
            .catch(error=>{
                console.log('Error Found');
            })

    }
}
