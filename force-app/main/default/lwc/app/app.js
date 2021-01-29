import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class App extends LightningElement {
    selectedProductId;
    boughtProducts=[];

    @wire(getProducts)
    products;

    handleTileClicked(event){
        this.selectedProductId = event.detail;
    }

    handleBuy(event){
        const productId = event.detail;
        this.products.data.forEach(product => {
             if(product.Id == productId){
                 this.boughtProducts.push(product);
             }
            
        });
        this.template.querySelector('c-buy').setProducts(this.boughtProducts);
    }

    handleCompare(event){
        const productId = event.detail;
        this.template.querySelector('c-compare').setProductId(productId);
    }
}