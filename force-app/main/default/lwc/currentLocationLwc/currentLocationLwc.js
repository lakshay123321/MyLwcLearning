import { LightningElement, wire } from 'lwc';
import getAccountMapMarkers from '@salesforce/apex/ApexClass.getAccountMapMarkers'
export default class AccountMap extends LightningElement {
    mapMarkers=[]
    markersTitle="Accounts Location"
    @wire(getAccountMapMarkers)
    wireHandler({data, error}){
        if(data){
            console.log(data)
            this.formatResponse(data)
        }
        if(error){
            console.error(error)
        }
    }

    formatResponse(data){
        this.mapMarkers = data.map(item=>{
            return {
                location:{
                    Street:item.BillingCity || '',
                    City:item.BillingCity ||'',
                    PostalCode: item.BillingPostalCode || '',
                    State: item.BillingState || '',
                    Country: item.BillingCountry || ''
                },
                icon:'utility:salesforce1',
                title:item.Name,
                value:item.Name,
                description:item.description
            }
        })
        this.selectedMarker = this.mapMarkers.length && this.mapMarkers[0].value
    }
    callMarkerHandler(event){
        this.selectedMarker = event.detail.selectedMarkerValue
    }

}