public class getAccounts 
{
    @AuraEnabled
	public static list<account> getAccountData()
    {
        list<account> acclist =[select id,name from account];
        system.debug('Acclist: '+acclist);
        return acclist;
    }
    
    @AuraEnabled
    public static list<contact> getContactData(String SelectedAccountid)
    {
        list<contact> conlist = [select id,name,email from contact where accountid =: SelectedAccountid];
        return conlist;
    }
}