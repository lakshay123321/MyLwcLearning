import { LightningElement,track } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    @track visible = true;
    @track visible1 = false;
    @track visible2 = false;

    @track label='Button 1';

    handleClick()
    {
        if(this.label==='Button 1')
        {
            this.visible=false;
            this.visible1=true;
            this.visible2=false;
            this.label='Button 2';
        }
        else if(this.label==='Button 2')
        {
            this.visible=false;
            this.visible1=false;
            this.visible2=true;
            this.label='Button 3';
        }
        else{
            this.visible=true;
            this.visible1=false;
            this.visible2=false;
            this.label='Button 1';
        }
    }
}