import { LightningElement, track } from 'lwc';
import SalesforceNoob from '@salesforce/resourceUrl/SalesforceNoob';
export default class CarouselWithStaticResource extends LightningElement {
    @track carouselItems = [
        {
            id: "1",
            src: SalesforceNoob + '/SFNoob_Images/pic1.jpg',
            header: '1',
            description: 'Description for pic 1'
        },
        {
            id: "2",
            src:SalesforceNoob + '/SFNoob_Images/pic2.jpg',
            header: '2',
            description: 'Description for pic 2'
        },
        {
            id: "3",
            src :SalesforceNoob + '/SFNoob_Images/pic3.jpg',
            header: '3',
            description: 'Description for pic 3'
        }
    ];
}