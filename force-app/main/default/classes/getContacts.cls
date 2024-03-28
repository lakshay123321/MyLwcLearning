public class getContacts 
{
    @AuraEnabled
	Public Static list<Contact> getContactData()
    {
        list<Contact> conlist = [Select id,Name from Contact];
        system.debug('Conlist : '+conlist);
        return conlist;
    }   
}