import { LightningElement } from 'lwc';

export default class OnclickFunctionOutput extends LightningElement {

    myTitle='Lakshay Ahuja';
    handleClick()
    {
        window.alert('Hi my name is lakshay')
    }
}