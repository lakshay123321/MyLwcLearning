/*
Create a batch that automatically creates new custom object records for all accounts that have been inactive for more than 90 days, 
and also update the account's custom field with the number of custom object records created.
The batch should run on a schedule and create the custom object records and update the account's custom field on a weekly basis.
*/

public class BatchApex implements database.Batchable<Sobject>
{
    public decimal countRecord = 0;
	public list<account> start (database.BatchableContext bc)
    {
       
       list<account> acclist = [SELECT Id, Name, LastActivityDate , active__c FROM Account WHERE LastActivityDate < LAST_N_DAYS:90 and active__c = 'No'];
       return acclist;
    }
    public void execute (database.BatchableContext bc,list<account>acclist)
    {
       list<CustomeObj__c>cusList = new list<CustomeObj__c>();
       for(account acc : acclist)
       {
           CustomeObj__c cus = new CustomeObj__c();
           cus.Account__c=acc.id;
           cus.name=acc.name;
           cusList.add(cus);
       }
        if(!cuslist.isEmpty())
        {
            Insert cusList;
        }
        List<Account> accountsToUpdate = new List<Account>();
        for (Account acc : [SELECT Id,CustomObjRecords__c, (SELECT Id FROM CustomeObjs__r) FROM Account WHERE Id IN :acclist]) 
        {
            acc.CustomObjRecords__c = acc.CustomeObjs__r.size();
            accountsToUpdate.add(acc);
            
        }
        if (!accountsToUpdate.isEmpty()) 
        {
            update accountsToUpdate;
        }
        
       List<Account> accountsToUpdate1 = [SELECT Id,CustomObjRecords__c FROM Account where id in :accountsToUpdate];
       for(account  acc12 : accountsToUpdate1)
       {
           countRecord+=acc12.CustomObjRecords__c;
       }
       system.debug('Total number of records affected is :- '+countRecord);
    }
    public void finish (database.BatchableContext bc)
    {
      
    }
}