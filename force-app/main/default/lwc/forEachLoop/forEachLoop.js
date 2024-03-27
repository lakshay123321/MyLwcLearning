import { LightningElement,wire } from 'lwc';
import AccountInfo from '@salesforce/apex/AccountInfo.getAccountList'
export default class ForEachLoop extends LightningElement {
    accounts;
    @wire (AccountInfo)
        getAccountInfo({data,error})
        {
            if(data)
            {
                this.accounts=data;
            }
            else{
                console.log('Error Found');
            }
        }
}