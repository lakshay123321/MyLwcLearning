public with sharing class lightningMapController {
    @AuraEnabled
    public static list<accountLocationWrapper> getLocation(){
          System.debug('Entering getLocation method');
        list<accountLocationWrapper> lstALW = new list<accountLocationWrapper>();
        
       
        for(account acc : [Select Name,description, BillingCountry, BillingCity, BillingPostalCode, BillingStreet, BillingState
                           From Account limit 10]){
                               
            
            System.debug('Processing Account: ' + acc.Name);
            
            
            locationDetailWrapper oLocationWrap = new locationDetailWrapper();
            oLocationWrap.Street = acc.BillingStreet;
            oLocationWrap.PostalCode = acc.BillingPostalCode;
            oLocationWrap.City = acc.BillingCity;
            oLocationWrap.State = acc.BillingState;
            oLocationWrap.Country = acc.BillingCountry;  
            
            System.debug('Location Details: ' + oLocationWrap);
            
            accountLocationWrapper oWrapper = new accountLocationWrapper();
            oWrapper.icon = 'utility:location';
            oWrapper.title = acc.Name;
            oWrapper.description = acc.description;
            oWrapper.location = oLocationWrap;
            
            System.debug('Wrapper Details: ' + oWrapper);
            
            lstALW.add(oWrapper);
        }

        return lstALW;
    }

    public class accountLocationWrapper{
        @AuraEnabled public string icon{get;set;} 
        @AuraEnabled public string title{get;set;} 
        @AuraEnabled public string description{get;set;} 
        @AuraEnabled public locationDetailWrapper location{get;set;} 
    }

    public class locationDetailWrapper{
        @AuraEnabled public string Street{get;set;}
        @AuraEnabled public string PostalCode{get;set;}
        @AuraEnabled public string City{get;set;}
        @AuraEnabled public string State{get;set;}
        @AuraEnabled public string Country{get;set;}
    }
}