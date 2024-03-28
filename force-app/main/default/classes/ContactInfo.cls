public class ContactInfo {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        List<Contact> conList = [SELECT Id, Name FROM Contact];
        System.debug('Contacts: ' + conList);
        return conList;
    }
}