import { LightningElement, track ,api} from 'lwc';
import getRelatedContacts from '@salesforce/apex/getRelatedContacts.getContacts';
const column1 = [
    { label: 'Contact Id', fieldName: 'Id' },
    { label: 'Contact Name', fieldName: 'Name' }
];

const column2 = [
    { label: 'Opportunity Id', fieldName: 'Id' },
    { label: 'Opportunity Name', fieldName: 'Name' }
];

export default class ShowRelatedConAndOpp extends LightningElement {
    @track label = 'Show';
    @track isVisible = false;
    @track column1 = column1;
    @track column2 = column2;
    @track contactData=[];
    @track opportunityData=[];
    @track conData=[];
    @track oppData=[];
    @api recordId;

    connectedCallback()
    {
        getRelatedContacts({recId:this.recordId})
            .then(res=>{
                let tempRecords = res;
                console.log('TempRecords are:- '+JSON.stringify(tempRecords));

                let temp = tempRecords.map(row=>{
                    return Object.assign({ContactName : row.Contacts , OpportunityName : row.Opportunities})
                });
                console.log('Temp are :- '+JSON.stringify(temp));

                temp.forEach(element => {
                    this.conData = element.ContactName;
                    console.log('condata :- '+JSON.stringify(this.conData));

                    this.oppData=element.OpportunityName;
                    console.log('oppData :- '+JSON.stringify(this.oppData));
                });
                this.contactData=this.conData;
                console.log('contactData :- '+JSON.stringify(this.contactData));

                this.opportunityData=this.oppData;
                console.log('opportunityData :- '+JSON.stringify(this.opportunityData));

            }).catch(error=>{
                console.error('error'+JSON.stringify(error));
            })
    }

    handleClick(event) {
        let value = event.target.label;
        if (value === 'Show') {
            this.label = 'Hide';
            this.isVisible = true;
        } else {
            this.label = 'Show';
            this.isVisible = false;
        }
    }
}
