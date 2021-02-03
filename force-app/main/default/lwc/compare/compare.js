import { LightningElement,api} from 'lwc';

export default class Compare extends LightningElement {
    
    product1Id;
    product2Id;
    product3Id;
    lastChanged=0;

    @api
    setProductId(prodId){
        console.log(prodId);
       if(this.lastChanged==0){
           this.product1Id=prodId;
           this.lastChanged=1;
       }else if(this.lastChanged==3){
         if(this.product2Id!= prodId && this.product3Id!=prodId){
             this.product1Id=prodId;
             this.lastChanged=1; 
         } 
      } else if(this.lastChanged == 1){
          if(this.product1Id!=prodId && this.product3Id!=prodId){
           this.product2Id=prodId;
           this.lastChanged=2;
          }
       }else if(this.product1Id!=prodId && this.product2Id!=prodId){
           this.product3Id=prodId;
           this.lastChanged=3;
       } 
    }

    handleRemove1(){
        this.product1Id=null;
        this.lastChanged=3;
    }

    handleRemove2(){
        this.product2Id=null;
        this.lastChanged=1;
    }

    handleRemove3(){
        this.product3Id=null;
        this.lastChanged=2;
    }

    // handleRemove(event){
    //     const selectedId = event.detail;

    //     if(selectedId == this.product1Id)
    //        this.product1Id=null;
    //        else if(selectedId == this.product2Id)
    //        this.product2Id=null;
    //        else
    //         this.product3Id=null;
    // }

}