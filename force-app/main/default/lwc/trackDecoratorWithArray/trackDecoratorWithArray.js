import { LightningElement,track} from 'lwc';
export default class TrackDecoratorWithArray extends LightningElement 
{
    @track firstname = [];
    @track lastname = [];

    handleChange(event)
    {
        const field = event.target.name;
        if(field==='firstname')
        {
            this.firstname=event.target.value;
        }
        else{
            this.lastname=event.target.value;
        }
    }
}