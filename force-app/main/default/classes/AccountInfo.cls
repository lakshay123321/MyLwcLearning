public class AccountInfo 
{
	@AuraEnabled
    Public static list<account> getAccountList()
    {
        list<account> accountlist = [select id,name from account];
        system.debug('accountlist : '+accountlist);
        return accountlist;
    }
    
   	@AuraEnabled
    Public static list<contact> getContactList(String SelectedAccountId)
    {
        list<contact> contactList = [select id,name from contact where accountid =: SelectedAccountId] ;
        system.debug('contactList : '+contactList);
        return contactList;
    }
}