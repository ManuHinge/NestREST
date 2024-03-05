import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.services";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async addProduct(
        @Body('title') prodTitle: String,
        @Body('description') prodDesc: String,
        @Body('price') prodPrice: number,
    ) {
        const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
        return { id: generatedId }
    }

    @Get()
    async getAllProducts() {
        const result = await this.productsService.getProducts()
        return result
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: String) {
        const result = await  this.productsService.getSingleProduct(prodId)
        return result
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: String,
        @Body('title') prodTitle: String,
        @Body('description') prodDesc: String,
        @Body('price') prodPrice: number,
    ) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
        return null
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: String) {
        await this.productsService.deleteProduct(prodId)
        return null
    }
} 
