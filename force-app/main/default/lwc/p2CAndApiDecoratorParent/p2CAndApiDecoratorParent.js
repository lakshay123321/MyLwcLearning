import { LightningElement } from 'lwc';

export default class P2CAndApiDecoratorParent extends LightningElement {

   handleValueChange()
   {
    this.template.querySelector('c-p2-c-and-api-decorator').handleValue();
   }
}