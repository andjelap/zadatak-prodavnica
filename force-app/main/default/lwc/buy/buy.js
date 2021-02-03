import { LightningElement, api, track } from 'lwc';

const columns = [
    {label: 'Name', fieldName: 'Name', type: 'text'},
    {label: 'Price', fieldName: 'Price__c', type: 'currency'},
    {label: 'Amount', fieldName: 'Amount', type: 'number'},
    {type: "button", typeAttributes: {  
        label: 'Remove',
        onclick: 'handleRemove',
        name: 'Remove',  
        iconPosition: 'left'  
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
   
    handleRemove(event){
        console.log("test remove")
        const recName =  event.detail.row.Name; 
        //console.log(this.data[0].Name);

        for(let i=0;i<this.data.length;i++){
            if(this.data[i].Name == recName){
                if(this.data[i].Amount != 0){
                    //console.log("AMOUNT PRE: " + this.data[i].Amount);
                    this.data[i].Amount--;
                   // console.log("AMOUNT POSLE: " + this.data[i].Amount);
                   this.setProducts(this.data);
                }
                else{
                  this.data.splice(i,1);
                  this.setProducts(this.data);
                  console.log(this.data.length);
                  if(this.data.length==0){
                      const niz = [];
                      this.setProducts(niz);
                  }
                }

            }
        }
       
    }

}