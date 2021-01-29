import { LightningElement, api } from 'lwc';

const columns = [
    {label: 'Name', fieldName: 'Name', type: 'text'},
    {label: 'Price', fieldName: 'Price__c', type: 'currency'}
];

export default class Buy extends LightningElement {
    columns = columns;
    data = [];

    @api
    setProducts(prods){
        this.data = [...prods];
    }

    get total(){
        return this.data.reduce((acc,currProd,)=>{
            return currProd.Price__c + acc;
        },0.0);
    }
}