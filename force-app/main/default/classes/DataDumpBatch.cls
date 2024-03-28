global class DataDumpBatch implements Database.Batchable<sObject> {
    Set<String> uniqueAccountNames = new Set<String>();

    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, Name, First_Name__c, Last_Name__c, OppName__c, Stage__c, CloseDate__c FROM DumpObject__c');
    }

    global void execute(Database.BatchableContext bc, List<DumpObject__c> scope) {
        List<Account> accountRecords = new List<Account>();
        List<Contact> contactRecords = new List<Contact>();
        List<Opportunity> opportunityRecords = new List<Opportunity>();

        for (DumpObject__c dumpRecord : scope) {
            if (!uniqueAccountNames.contains(dumpRecord.Name)) {
                uniqueAccountNames.add(dumpRecord.Name);

                Account accountRecord = new Account(
                    Name = dumpRecord.Name
                );
                accountRecords.add(accountRecord);

                Contact contactRecord = new Contact(
                    FirstName = dumpRecord.First_Name__c,
                    LastName = dumpRecord.Last_Name__c,
                    AccountId = accountRecord.Id
                );
                contactRecords.add(contactRecord);

                Opportunity opportunityRecord = new Opportunity(
                    Name = dumpRecord.OppName__c,
                    StageName = dumpRecord.Stage__c,
                    CloseDate = dumpRecord.CloseDate__c,
                    AccountId = accountRecord.Id
                );
                opportunityRecords.add(opportunityRecord);
            }
        }

        insert accountRecords;

        for (Integer i = 0; i < contactRecords.size(); i++) {
            contactRecords[i].AccountId = accountRecords[i].Id;
        }
        insert contactRecords;

        for (Integer i = 0; i < opportunityRecords.size(); i++) {
            opportunityRecords[i].AccountId = accountRecords[i].Id;
        }

        insert opportunityRecords;
    }

    global void finish(Database.BatchableContext bc) {
        // Clean up any resources if needed
    }
}