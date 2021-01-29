import { LightningElement,api} from 'lwc';

export default class Compare extends LightningElement {
    
    product1Id;
    product2Id;
    product3Id;
    lastChanged=0;

    @api
    setProductId(prodId){
        console.log(prodId);
       if(this.lastChanged==0 || this.lastChanged==3){
           this.product1Id=prodId;
           this.lastChanged=1;
       }else if(this.lastChanged == 1){
           this.product2Id=prodId;
           this.lastChanged=2;
       }else{
           this.product3Id=prodId;
           this.lastChanged=3;
       } 
    }
}