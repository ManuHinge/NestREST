import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.services";
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from "./product.model";

@Module({
    imports :[MongooseModule.forFeature([{name : "product", schema :ProductSchema }])] ,
    controllers : [ProductsController],
    providers : [ProductsService]
})
export class ProductsModule {}