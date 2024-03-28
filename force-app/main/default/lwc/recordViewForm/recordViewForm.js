import { LightningElement , api} from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import Account_Id from '@salesforce/schema/Account.Id';
export default class RecordViewForm extends LightningElement {
    accountName=ACCOUNT_NAME;
    accountId=Account_Id;
    @api recordId;
    @api objectApiName;
}