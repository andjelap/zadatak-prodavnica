import { LightningElement, api, track } from 'lwc';

const columns = [
    {label: 'Name', fieldName: 'Name', type: 'text'},
    {label: 'Price', fieldName: 'Price__c', type: 'currency'},
    {label: 'Amount', fieldName: 'Amount', type: 'number'},
    {type: "button", typeAttributes: {  
        label: 'Remove',
        onclick: 'clickButtonRemove',
        name: 'Remove',  
        iconPosition: 'right'  
    }}  
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
            return currProd.Price__c*currProd.Amount + acc;
        },0.0);
    }

   clickButtonRemove(event){
       const selectedId = event.detail;
       const ev = new CustomEvent('childremove', {detail: selectedId});
       this.dispatchEvent(ev);
   }

}