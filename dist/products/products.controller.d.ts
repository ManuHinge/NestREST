import { ProductsService } from "./products.services";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(prodTitle: String, prodDesc: String, prodPrice: number): Promise<{
        id: string;
    }>;
    getAllProducts(): Promise<import("./product.model").Product[]>;
    getProduct(prodId: String): Promise<import("./product.model").Product>;
    updateProduct(prodId: String, prodTitle: String, prodDesc: String, prodPrice: number): Promise<any>;
    removeProduct(prodId: String): Promise<any>;
}
