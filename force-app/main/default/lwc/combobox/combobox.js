import { LightningElement,track } from 'lwc';
import AccountInfo from '@salesforce/apex/AccountInfo.getAccountList';
export default class Combobox extends LightningElement {

    @track arrOption=[] ;
    @track value = '';
    visible=false;

    get options()
    {
        return this.arrOption;
    }

    connectedCallback()
    {
        AccountInfo()
            .then(result=>{
                let arr=[];
                for(var i=0;i<result.length;i++)
                {
                    arr.push({label:result[i].Name , value : result[i].Id})
                }
                this.arrOption=arr;
            })
    }

    handleChange(event)
    {
        this.value=event.detail.value;
        this.visible=true;
    }
}