import { LightningElement ,api} from 'lwc';

export default class P2CAndApiDecorator extends LightningElement {

     @api myTitle = 'Lakshay Ahuja';

     @api handleValue()
     {
        this.myTitle='Lakshay Ahuja is chnaged to Lakshay';
     }
}