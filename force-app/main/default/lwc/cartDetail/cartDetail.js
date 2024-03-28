import { LightningElement , wire, track } from 'lwc';
import { CurrentPageReference , NavigationMixin } from 'lightning/navigation';
import getItems from '@salesforce/apex/BeerController.getItems';//1
import { deleteRecord } from 'lightning/uiRecordApi';
import couponInfo from '@salesforce/apex/BeerController.couponInfo';//2
import cartico from '@salesforce/resourceUrl/cart';
import addressDetails from '@salesforce/apex/BeerController.addressDetails';
import saveAddress from '@salesforce/apex/BeerController.saveAddress';
import createOrder from '@salesforce/apex/BeerController.createOrder';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CartDetail extends NavigationMixin(LightningElement) {
    @track isCouponApplied = false;
    @track cartid;
    @track Items;
    @track errors;
    @track totalItems;
    @track totalAmount = 0.00;
    @track isCoupoun = false;
    @track couponName; 
    @track couponValue = 0;
    @track addressess;
    cart = cartico;
    @track isProceed = false;
    @track addressId;
    @track totalAddress = 0;
    @track selectedAddress;
    @track addr = {
        City__c : '',
        Country__c : '',
        Postal_Code__c : '',
        State__c : '',
        Street__c : ''
    };

    
    @wire(CurrentPageReference)
        setCurrentPageReference(currentPageReference) {
            this.cartid = currentPageReference.state.c__cartId;
            console.log(' Cart Id => ', this.cartid);
        }

    handleChangeCoupon(event){
        this.couponName = event.target.value;
    }
    connectedCallback(){
        this.cartItems();
        this.getAddressDetails();
        this.isCouponApplied = false;
    }

    handleAddressSelect(event){
        const selectedAddressId = event.detail;
        this.addressId = selectedAddressId;

        this.selectedAddress = this.addressess.find(
            record => record.Id === selectedAddressId
        );
        
    }

    placeOrder(){
        if(!this.selectedAddress){
            alert('Please select shipping address !!');
            return;
        }
        createOrder({
            cartId : this.cartid,
            addressId : this.selectedAddress.Id,
            totalAmount : this.totalAmount
        })
        .then(result => {
            console.log(' Order Information is ', result);
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : 'Order has beed successfully placed. Your Order no is '+result.Name,
                "variant" : "success", 
            });
            this.dispatchEvent(toast);

            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    apiName: 'Order_Detail' 
                },
                state : {
                    c__orderId : result.Id
                }
            }, true);
        })
        .catch(error => {
            console.error(error);
        });
    }

    handleSaveAddress() {
        saveAddress({
            addressDetails : JSON.stringify(this.addr)
        })
        .then(result => {
            if ( this.addressess ){
                console.log('result Addrsss are avalible ', result);
                this.addressess.push(result);
            } else {
                console.log('result Address No ', result);
                this.addressess = [];
                this.addressess.push(result);
            }
            this.totalAddress = 1;
        })
        .catch(error => {
            console.error(error);
        });
    }
    handleAddNewAddress(){
        this.totalAddress = undefined;
    }
    handleInputChange(event){
        const name = event.target.name; 
        const value = event.target.value; 
        this.addr[name] = value; 
    }

    getAddressDetails(){
        addressDetails()
        .then(result => {
            this.addressess = result;
            this.totalAddress = result.length;
        })
        .catch(error => {
            console.error(error);
        });
    }

    handleProceed()
    {
        this.isProceed = true;
    }

    handleDeleteItem(event)
    {
        const selectedItemId = event.detail;
        
        const selectedItem = this.Items.find(
            item => item.Id === selectedItemId
        );
        const indexItem = this.Items.indexOf(selectedItem);
        console.log(indexItem);
        deleteRecord(selectedItemId)
            .then(() => {
                console.log(' Item deleted ');
                this.Items.splice(indexItem, 1);
                this.totalAmount = this.totalAmount - selectedItem.Total_Amount__c;
                this.totalItems = this.totalItems - 1;  

                // here we are resetting the values of the coupon
                this.isCouponApplied = false;

                // Here we are Reseting subtotal value to 0 when every item is deleted
                if (this.totalItems === 0) {
                    this.totalAmount = 0.00;
                    this.couponName = '';
                    this.couponValue = 0;
                    this.isCoupoun=false;
                }
            })
            .catch( error =>{
                console.error(error);
            });
    }

    handleContinue(){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Beer_Explorer' 
            },
            state : {
                c__cartId : this.cartId
            }
        });
    }

    cartItems(){
        getItems({
            cartId : this.cartid
        })
        .then(result => {
            console.log(' Cart Items ', JSON.parse(result));
            this.Items = JSON.parse(result);
            this.totalItems = this.Items.length;
            this.errors = undefined;

            for ( let i = 0 ; i < this.Items.length; i ++) {
                if ( this.Items[i]){
                    this.totalAmount = this.totalAmount + this.Items[i].Total_Amount__c;
                }
            }
        })
        .catch( error => {
            this.carteItems = undefined;
            this.errors = error;
        });
    }

    handleCoupon(){
        this.isCoupoun = true;
    }

    applyCupon(){
        if (this.totalAmount <= 0) 
        {
            alert('Cannot apply coupon when subtotal amount is zero or less.');
            return;
        }
       
        if (this.isCouponApplied) {
            alert('Coupon has already been applied for this cart.');
            return;
        }

        if (!this.couponName) {
            alert(' Please Provide a Valid Coupon!! ');
            return;
        }
        if( this.couponName) {
            couponInfo({
                name : this.couponName
            })
            .then(result => {
                console.log(' Result is ', result);
                this.couponValue = result.Price__c;
                this.totalAmount = this.totalAmount - this.couponValue;
            })
            .catch( error => {
                console.log(' Error ', error);
                alert(' Please Provide a Valid Coupon!! ');
                this.totalAmount = this.totalAmount + this.couponValue;
                this.couponValue = 0;
            });
        }
        this.isCouponApplied = true;

    }
}