import { LightningElement ,track } from 'lwc';

export default class ParentLwc extends LightningElement 
{
    @track count=0;

    handleAdd()
    {
        this.count++;
    }

    handleSubtract()
    {
        if(this.count>0)
        {
            this.count--;
        }
        else{
            console.log('The vale of count is less than or equal to zero so you cannot able to subtract anymore.')
        }
    }

    handleMultiply(event)
    {
        const val = event.detail;
        this.count*=val;
    }
}