import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscriber, Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
selector: 'pm-products',
templateUrl: './product-list.component.html',
styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit,OnDestroy {
    // private _productService;
    // constructor(productService: ProductService){
    //     this._productService=productService;
    // }

    
 
    pageTitle: string='Product List';
    imageWidth: number=50;
    imageMargin: number =2;
    showImage: boolean=false;
    errorMessage: string='';
    sub!: Subscription;
    //listFilter: string='cart';
    private _listFilter: string='';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter=value;
        console.log('In setter:', value);
        this.filteredProducts=this.performFilter(value);
    }

    filteredProducts: IProduct[] =[];  
    products: IProduct[]=[];


    //products: any[] = [
    // products: IProduct[] = [
    //     {
    //         "productId": 2,
    //         "productName": "Garden Cart",
    //         "productCode": "GDN-0023",
    //         "releaseDate": "March 18, 2021",
    //         "description": "15 gallon capacity rolling garden cart",
    //         "price": 32.99,
    //         "starRating": 4.2,
    //         "imageUrl": "assets/images/garden_cart.png"
    //     },
    //     { 
    //         "productId": 5,
    //         "productName": "Hammert",
    //         "productCode": "TBX-0048",
    //         "releaseDate": "May 21, 2021",
    //         "description": "Curved claw steel hammer",
    //         "price": 8.9,
    //         "starRating": 4.8,
    //         "imageUrl": "assets/images/hammer.png"
    //     }
    // ];
    constructor(private productService: ProductService){

    }
    

    performFilter(filterBy: string): IProduct[] {
        filterBy=filterBy.toLocaleUpperCase();
        return this.products.filter((product: IProduct)=>
        product.productName.toLocaleUpperCase().includes(filterBy));
    }
    

   toggleImage(): void{
       this.showImage=!this.showImage;
   }

   ngOnInit(): void {
        //this.products=this.productService.getProduct();
        this.sub= this.productService.getProduct().subscribe({
            next:   products=>{
                this.products=products;
                this.filteredProducts=this.products;
            },
            error:  err=>this.errorMessage=err
        });
        
        //this.listFilter='cart';
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe;
    }
    

    onRatingClicked(message: string): void{
        this. pageTitle= 'Product List: '+ message;
    }
}