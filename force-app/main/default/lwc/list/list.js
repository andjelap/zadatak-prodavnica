import { LightningElement, api } from 'lwc';

export default class List extends LightningElement {
    @api
    products;

    handleTileClicked(event){
        const selectedId = event.detail;
        const ev = new CustomEvent('tileclicked',{detail: selectedId});
        this.dispatchEvent(ev);
    }

    handleBuy(event){
        const boughtId = event.detail;
        const ev = new CustomEvent('buy',{detail:boughtId});
        this.dispatchEvent(ev);
    }

    handleCompare(event){
        const compId = event.detail;
        const ev = new CustomEvent('compare',{detail:compId});
        this.dispatchEvent(ev);
    }
}