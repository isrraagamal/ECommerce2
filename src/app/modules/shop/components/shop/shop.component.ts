import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ibreadcrumb } from 'src/app/models/ibreadcrumb';
import { Iproductcard } from 'src/app/models/iproductcard';
import { iProduct } from 'src/app/models/iproduct';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  shopBreadCrumbData: Ibreadcrumb = {
    title: 'shop',
    prev: 'home',
  };
  products: iProduct[] | undefined;
  paginatedProducts: iProduct[] = [];
  loading: boolean = false; 
  pageIndex: number = 0;
  pageSize: number = 12;
  totalItems: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private productService: ProductService) {}
  // ngOnInit(): void {
   
  //   this.loading = true; 

  //   this.productService.getAllProducts().subscribe(
  //     (data: any) => { 
  //       if (data && data.success) {
  //         this.products = data.data.products;
  //         if(this.products){
  //         this.paginatedProducts = this.products.slice(0, 12);
  //         } 
  //         console.log(this.products);
  //       } else {
  //         console.error('Error fetching products:', data.message);
  //       }
  //       this.loading = false; 
  //     },
  //     (error) => {
  //       console.error('Error fetching products', error);
  //       this.loading = false; 
  //     }
  //   );
  // }
  ngOnInit(): void {
    this.loading = true; 

    this.productService.getAllProducts().subscribe(
      (data: any) => { 
        if (data && data.success) {
          this.products = data.data.products;
          if(this.products){
          this.totalItems = this.products.length;
          this.paginate();
          }
          console.log(this.products);
        } else {
          console.error('Error fetching products:', data.message);
        }
        this.loading = false; 
      },
      (error) => {
        console.error('Error fetching products', error);
        this.loading = false; 
      }
    );
  }


  // ngAfterViewInit() {
  //   this.paginator?.page.subscribe(() => {
  //     if (this.products) { 
  //       this.paginatedProducts = this.products.slice(
  //         this.paginator.pageIndex * this.paginator.pageSize,
  //         (this.paginator.pageIndex + 1) * this.paginator.pageSize
  //       );
  //     }
  //   });
  // }
  
  paginate(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedProducts = this.products?.slice(startIndex, startIndex + this.pageSize) || [];
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.paginate();
    }
  }

  prevPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.paginate();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  }

