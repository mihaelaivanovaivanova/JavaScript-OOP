/* globals module */
"use strict";

function solve(){
    class Product{
        constructor(productType,name,price){
            this._productType=productType;
            this._name=name;
            this._price=price;
        }
        get productType(){
            return this._productType;
        }
        set productType(newProductType){
            if(typeof(newProductType)!=='string'||!(newProductType)||isNaN(newProductType)){
                throw new Error('Product type must be a string');
            }
            this._productType=newProductType;
        }
        get name(){
            return this._name;
        }
        set name(newName){
            if(typeof(newName)!=='string'||!(newName)||isNaN(newName)){
                throw new Error('Name must be a string');
            }
            this._name=newName;
        }
        get price(){
            return this._price;
        }
        set price(newPrice){
            if(typeof(newPrice)!=='number'||!(newPrice)||isNaN(newPrice)){
                throw new Error('Price must be a number');
            }
            this._price=newPrice;
        }
    }
    class ShoppingCart{
        constructor(){
            this._products=[];
        }
        get products(){
            return this._products;
        }

        add(product){
            if(!(product instanceof Product)||!(product)){
                throw new Error('Please insurt a product to add!');
            }
            this.products.push(product);
            return this;
        }

        remove(product){
            if(!(product instanceof Product)||!(product)){
                throw new Error('Please insurt a product to add!');
            }
            if(this.products.length<0){
                throw new Error('There are no products in the card');
            }
            function areSame(element){
                return (element.name===product.name && element.productType===product.productType && element.price===element.price);
            }
            let index=this.products.findIndex(areSame);
            if(index<0){
                throw new Error('There is no such product in the card');
            }
            this.products.splice(index,1);

            return this;
        }

        showCost(){
            let sum=0;
            for(let product of this.products){
                sum+=product.price;
            }
            return sum;
        }

        showProductTypes(){
            let uniqueProductTypes=[];
            for(let product of this.products){
                if(uniqueProductTypes.indexOf(product.productType)<0){
                    uniqueProductTypes.push(product.productType);
                }
            }
            return uniqueProductTypes.sort();
        }

        getInfo(){
            let groups=[];
            let names =[];
            let quantity=[];
            let price=[];
            
            for (let product of this.products){
                let index=names.indexOf(product.name);
                if(index<0){
                    names.push(product.name);
                    quantity.push(1);
                    price.push(product.price);
                }
                else{
                    quantity[index]+=1;
                    price[index]+=product.price;
                }
            }
            for(let i=0;i<names.length;i+=1){
                groups.push({name:names[i], totalPrice:price[i], quantity:quantity[i]});
            }
            let result={products:groups,totalPrice:this.showCost()};
            return result;
        }
        
    }
    
    return {
        Product, ShoppingCart
    };
}

module.exports = solve;