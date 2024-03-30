import { LightningElement, track } from 'lwc';

    export default class CarouselComponent extends LightningElement {
        @track carouselItems = [
            {
                id: '1',
                src: 'https://www.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                header: 'First Card',
                description: 'First card description',
                altText: 'This is a card',
                href: 'https://www.example.com'
            },
            {
                id: '2',
                src: 'https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
                header: 'Second Card',
                description: 'Second card description',
                altText: 'Second card accessible description',
                href: 'https://www.example.com'
            },
            {
                id: '3',
                src: 'https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
                header: 'Third Card',
                description: 'Third card description',
                altText: 'Third card accessible description',
                href: 'https://www.example.com'
            }
        ];
    }