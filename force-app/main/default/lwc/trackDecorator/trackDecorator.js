import { LightningElement,track } from 'lwc';

export default class TrackDecorator extends LightningElement {
    @track fullname = {firstname:"",lastname:""};

    handleChange(event)
    {
        const field = event.target.name;
       window.alert('Field name is :- '+field);

        if(field==='firstname')
        {
            this.fullname.firstname=event.target.value;
            console.log('Firstname is : ',this.fullname.firstname);
        }
        else if(field==='lastname'){
            this.fullname.lastname=event.target.value;
            console.log('lastname is : ',this.fullname.lastname);
        }
    }
}