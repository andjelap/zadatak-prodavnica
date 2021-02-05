import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class App extends LightningElement {
    selectedProductId;
    //boughtProducts = new Map();
    boughtProd = [];

    @wire(getProducts)
    products;

    handleTileClicked(event){
        this.selectedProductId = event.detail;
    }

    // handleBuy(event){
    //     const productId = event.detail;
    //     this.products.data.forEach(product => {
    //          if(product.Id == productId){
    //              this.boughtProducts.push(product);
    //          }
            
    //     });
    //     this.template.querySelector('c-buy').setProducts(this.boughtProducts);
    // }

    handleBuy(event){
        const productId = event.detail;
        this.products.data.forEach(product => {
             if(product.Id == productId){
                // if(this.boughtProducts.has(product.Name)){

                //       let i = this.boughtProducts.get(product.Name) + 1;
                //       this.boughtProducts.set(product.Name, i);
                let ind = true;
                      for(let j=0;j<this.boughtProd.length;j++){
                          if(this.boughtProd[j].Name == product.Name){
                              this.boughtProd[j].Amount++;
                              ind = false;
                              break;
                          }
                      }

                    
                 if(ind == true) {
                    var pro = {
                        Name: product.Name,
                        Price__c: product.Price__c,
                        Amount: 1
                    };
                    // this.boughtProducts.set(product.Name, 1);
                     this.boughtProd.push(pro);
                 }
             
                }
            
        });
        
        console.log(this.boughtProd);
        this.template.querySelector('c-buy').setProducts(this.boughtProd);
    }


    handleRemove(event){
        console.log("test remove")
        const recName =  event.detail.row.Name; 

        for(let i=0;i<this.boughtProd.length;i++){
            if(this.boughtProd[i].Name == recName){
                if(this.boughtProd[i].Amount > 1){
                    this.boughtProd[i].Amount--;
                 //   this.boughtProducts.set(this.boughtProd[i].Name, j);
                   
                }
                else{
                  //this.boughtProducts.delete(this.boughtProd[i].Name);
                  this.boughtProd.splice(i,1);
                
                }

            }
        }
        this.template.querySelector('c-buy').setProducts(this.boughtProd);
       
    }

    handleCompare(event){
        const productId = event.detail;
        this.template.querySelector('c-compare').setProductId(productId);
    }
}