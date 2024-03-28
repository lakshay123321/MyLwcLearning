public with sharing class BulkDeleteAccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Industry FROM Account WHERE Name LIKE 'dd%'];
    }

    @AuraEnabled
    public static void deleteAccounts(List<Id> accountIds) {
        delete [SELECT Id FROM Account WHERE Id IN :accountIds];
    }
}