import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class App extends LightningElement {
    selectedProductId;
    boughtProducts = new Map();
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
                if(this.boughtProducts.has(productId)){

                      let i = this.boughtProducts.get(productId) + 1;
                      this.boughtProducts.set(productId, i);
                      for(let j=0;j<this.boughtProd.length;j++){
                          if(this.boughtProd[j].Name == product.Name)
                              this.boughtProd[j].Amount++;
                      }

                    }
                 else {
                    var pro = {
                        Name: product.Name,
                        Price__c: product.Price__c,
                        Amount: 1
                    };
                     this.boughtProducts.set(productId, 1);
                     this.boughtProd.push(pro);
                 }
             
                }
        });
        
        console.log(this.boughtProd);
        this.template.querySelector('c-buy').setProducts(this.boughtProd);
    }


    handleCompare(event){
        const productId = event.detail;
        this.template.querySelector('c-compare').setProductId(productId);
    }
}