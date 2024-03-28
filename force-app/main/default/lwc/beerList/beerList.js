import { LightningElement, track, wire } from 'lwc';
import searchBeer from '@salesforce/apex/BeerController.searchBeer';
import cartIco from '@salesforce/resourceUrl/cart'; //2 
import getCartId from '@salesforce/apex/BeerController.getCartId';//1 and 4
import createCartItems from '@salesforce/apex/BeerController.createCartItems'; //3
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class BeerList extends NavigationMixin(LightningElement)
{
    @track beerRecords;
    @track errros;
    @track cart = cartIco;
    @track cartId;
    @track itemsinCart = 0;

    connectedCallback()
    { //jese hi page load hoga toh cart main jitni bhi items hai usse show krega
        this.defaultCartId();
    } 

    defaultCartId(){
        getCartId()
        .then(data => {
            const wrapper = JSON.parse(data);
            if ( wrapper ){
                this.itemsinCart = wrapper.Count;
                this.cartId = wrapper.CartId;
            }
        })
        .catch(error => {
            this.cartId = undefined;
            console.log(error);
        });
    } //1

    navigateToCartDetail(){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Cart_Detail' // Cart_Detail is an api name for our Cart Detail tab
            },
            state : {
                c__cartId : this.cartId //state is a object parameter which we use to pass the parameter in our URL as a page reference.
            }
        });
    }

    addToCart(event){
        const selectBeerId = event.detail; //tile se beer ki record id aajayegi

        const selectBeerRecord = this.beerRecords.find(
            record => record.Id === selectBeerId
        );
        createCartItems({
            CartId : this.cartId,
            BeerId : selectBeerId,
            Amount : selectBeerRecord.Price__c
        })
        .then(data => {
            console.log(' Cart Item Id ', data);
            this.itemsinCart = this.itemsinCart + 1;
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : selectBeerRecord.Name +' Added into Cart!',
                "variant" : "success", 
            });
            this.dispatchEvent(toast);
        })
        .catch(error => {
            console.log(error);
            const toast = new ShowToastEvent({
                'title' : 'Error!!',
                "message" : JSON.stringify(error),
                "variant" : "error", 
            });
            this.dispatchEvent(toast);
        });

    }
    
    @wire(searchBeer)
        wiredRecords({error, data}){
            
            if ( data ) {
                this.beerRecords = data;
                this.errors = undefined;
            }
            if( error ) {
                this.beerRecords = undefined;
                this.errors = error;
            }
        }

    handleEvent(event){
        const eventVal = event.detail;
        
        searchBeer({
            searchParam : eventVal
        })
        .then(result => {
            
            this.beerRecords = result;
            this.errros = undefined;
        })
        .catch(error => {
            
            this.errors = error;
            this.beerRecords = undefined;
        })
    }
}