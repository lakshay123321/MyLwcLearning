import { LightningElement,api} from 'lwc';

export default class ChildLwcOne extends LightningElement {
    @api counterValue = 0;
}