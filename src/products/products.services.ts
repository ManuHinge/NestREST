import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
    products : Product[] = [];

    constructor(@InjectModel('product') private readonly productModel : Model<Product>) {}

    async insertProduct(title : String, desc : String, price : number ){
        const newProduct = new this.productModel({title, description : desc,price})
        const result = await newProduct.save()
        return result._id as string
    }


    async getProducts(){
        const result = await this.productModel.find()
        return result as Product[];
    }

    async getSingleProduct(productId : String){
        const product = await this.findProduct(productId)
        return product;
    }

    async updateProduct(productId : String,title : String, desc : String, price : number){
        const updateProduct = await this.findProduct(productId)
        if(title){updateProduct.title = title}
        if(desc){updateProduct.description = desc}
        if(price){updateProduct.price = price}
        updateProduct.save()
    }

    async deleteProduct(prodId : String){
        const result = await this.productModel.deleteOne({_id : prodId})
    }

    private async findProduct(id : String) :Promise<Product> {
        let  product
        try {
            product = await this.productModel.findById(id)
        } catch (error) {
            throw new NotFoundException("product not found")
        }
        if(!product){
           throw new NotFoundException("product not found")
        }
        return product
    }
}