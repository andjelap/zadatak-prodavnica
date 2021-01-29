import { LightningElement,api,wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import ID_FIELD from '@salesforce/schema/Product2.Id';
import NAME_FIELD from '@salesforce/schema/Product2.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Product2.Description';
import PRICE_FIELD from '@salesforce/schema/Product2.Price__c';
import PICTURE_FIELD from '@salesforce/schema/Product2.Image__c';
import COLOR_FIELD from '@salesforce/schema/Product2.Color__c';
import DIMENSIONS_FIELD from '@salesforce/schema/Product2.Dimensions__c';
import RATING_FIELD from '@salesforce/schema/Product2.Rating__c';

const FIELDS = [ID_FIELD,NAME_FIELD,DESCRIPTION_FIELD,PRICE_FIELD,PICTURE_FIELD,COLOR_FIELD,DIMENSIONS_FIELD,RATING_FIELD];

export default class Detail extends LightningElement {
    @api selectedProductId;
    @api compare = false;

    error;
    product;

    @wire(getRecord, { recordId: '$selectedProductId', fields: FIELDS})
    wiredProduct({error, data}){
        if(error){
            this.error = error.body.message;
        } else if (data){
            this.product = data;
        }
    }

    get name() {
        return getFieldValue(this.product, NAME_FIELD);
    }
    get description(){
        return getFieldValue(this.product, DESCRIPTION_FIELD);
    }
    get price() {
        return getFieldValue(this.product, PRICE_FIELD);
    }
    get picture() {
        return getFieldValue(this.product, PICTURE_FIELD);
    }
    get color() {
        return getFieldValue(this.product, COLOR_FIELD);
    }
    get dimensions() {
        return getFieldValue(this.product, DIMENSIONS_FIELD);
    }
    get rating() {
        return getFieldValue(this.product, RATING_FIELD);
    }

    handleBuy(){
        const prodId = getFieldValue(this.product, ID_FIELD);
        const event = new CustomEvent('buy',{detail:prodId});
        this.dispatchEvent(event);
    }

    handleCompare(){
        const prodId = getFieldValue(this.product, ID_FIELD);
        const event = new CustomEvent('compare',{detail:prodId});
        this.dispatchEvent(event);
    }
}