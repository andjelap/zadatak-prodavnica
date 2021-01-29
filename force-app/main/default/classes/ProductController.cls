public with sharing class ProductController {

    @AuraEnabled(Cacheable=true)
    public static List<Product2> getProducts(){
        
        List<Product2> products = [ SELECT Id, Name, Price__c, Description, Image__c, Rating__c, Dimensions__c, Color__c
         FROM Product2 WHERE Price__c != null ];
        return products;
        
    }
}
