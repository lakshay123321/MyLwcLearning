import { LightningElement } from 'lwc';

export default class ArrowFunction extends LightningElement {

    value='';
    connectedCallback()
    {
        let callmyFunction = this.myfunction(10,5);
        this.value=callmyFunction;
        console.log('Value : ',callmyFunction);
    }

   /* myfunction (dividend ,divisior)
    {
        return (dividend/divisior);
    }*/

    myfunction=(dividend ,divisior)=>{
        return (dividend/divisior);
    }
}