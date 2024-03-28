public with sharing class ApexClass {
    @AuraEnabled(cacheable=true)
    public static List<MapMarkerWrapper> getAccountMapMarkers(String accountId) {
        List<MapMarkerWrapper> mapMarkers = new List<MapMarkerWrapper>();
          
        Account currentAccount = [SELECT BillingState FROM Account WHERE Id = :accountId LIMIT 1];
        String currentState = currentAccount.BillingState;
           
        List<Account> accounts = [SELECT Id, BillingStreet, BillingCity, BillingState, BillingLatitude, BillingLongitude, Name 
                                  FROM Account
                                  WHERE BillingState = :currentState];
        
        for (Account acc : accounts) {
            MapMarkerWrapper marker = new MapMarkerWrapper();
            marker.location = new Location(acc.BillingStreet, acc.BillingCity, acc.BillingState);
            marker.title = acc.Name;
            marker.description = 'Hi I am ' + acc.BillingCity;
            marker.recordId = acc.Id; 
            system.debug(marker.recordId);
            mapMarkers.add(marker);
        }
        
        return mapMarkers;
    }
    
    public class Location {
        @AuraEnabled
        public String Street;
        @AuraEnabled
        public String City;
        @AuraEnabled
        public String State;
        
        public Location(String street, String city, String state) {
            this.Street = street;
            this.City = city;
            this.State = state;
        }
    }
    
    public class MapMarkerWrapper {
        @AuraEnabled
        public Location location;
        @AuraEnabled
        public String title;
        @AuraEnabled
        public String description;
        @AuraEnabled
        public String recordId; // Include the Account Id
    }
}