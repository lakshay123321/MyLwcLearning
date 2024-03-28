public with sharing class DateComponentController {

    public class AccountOpportunityWrapper {
        @AuraEnabled
        public Account acc { get; set; }
        @AuraEnabled
        public List<Opportunity> opps { get; set; }

        public AccountOpportunityWrapper(Account a, List<Opportunity> o) {
            acc = a;
            opps = o;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<AccountOpportunityWrapper> getAccountsAndOpportunitiesByDate(Date selectedDate) {
        List<AccountOpportunityWrapper> result = new List<AccountOpportunityWrapper>();

        List<Account> accounts = [SELECT Id, Name, CreatedDate FROM Account WHERE DAY_ONLY(CreatedDate) = :selectedDate];
        List<Opportunity> opportunities = [SELECT Id, Name, CreatedDate, AccountId FROM Opportunity WHERE DAY_ONLY(CreatedDate) = :selectedDate];

        // Map to store opportunities grouped by account Id
        Map<Id, List<Opportunity>> accountOpportunitiesMap = new Map<Id, List<Opportunity>>();

        // Here we are grouping opportunities by accountId
        for (Opportunity opp : opportunities) {
            if (!accountOpportunitiesMap.containsKey(opp.AccountId)) {
                accountOpportunitiesMap.put(opp.AccountId, new List<Opportunity>());
            }
            accountOpportunitiesMap.get(opp.AccountId).add(opp);
        }

        // Populating the result list with combined Account and Opportunity details
        for (Account acc : accounts) {
            List<Opportunity> relatedOpps = accountOpportunitiesMap.get(acc.Id);
            result.add(new AccountOpportunityWrapper(acc, relatedOpps));
            system.debug(result);
        }
        return result;
    }
}