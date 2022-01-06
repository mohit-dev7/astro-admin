import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{

  public products=[];
  public productId;
  public pageNo = 1;
  public totalPage = 0; 
  public shortBy = "name" 
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getRequest('/product/list',{"pageAble":true,"pageNo":1,"sortBy":"name"}).subscribe((res)=>{
      if(!res.status){
        console.log("error");
      }
      this.products = res.data;
      this.totalPage = res.totalPage;
      console.log(this.products);
    })
  }

  deleteProduct(id){
    this.authService.deleteRequest(`/product/delete/${id}`).subscribe((res)=>{
      if(!res.status){
        console.log("error! something went wrong.")
      }
      console.log("delete successfully")
      window.location.reload();
    })
  }

  setDeleteId(id){
    this.productId = id
  }

  nextPage(pageNo){
    console.log(pageNo)
    this.pageNo = pageNo+1;
    this.authService.getRequest('/product/list',{"pageAble":true,"pageNo":this.pageNo,"sortBy":this.shortBy}).subscribe((res)=>{
      if(!res.status){
        console.log("error");
      }
      this.products = res.data;
      this.totalPage = res.totalPage;
      console.log(this.products);
    })
  }

  prvPage(pageNo){
    console.log(pageNo)
    this.pageNo = pageNo-1;
    this.authService.getRequest('/product/list',{"pageAble":true,"pageNo":this.pageNo,"sortBy":this.shortBy}).subscribe((res)=>{
      if(!res.status){
        console.log("error");
      }
      this.products = res.data;
      this.totalPage = res.totalPage;
      console.log(this.products);
    })
  }

  setSortBy(sortBy){
    console.log(sortBy)
    this.shortBy = sortBy
    this.authService.getRequest('/product/list',{"pageAble":true,"pageNo":this.pageNo,"sortBy":this.shortBy}).subscribe((res)=>{
      if(!res.status){
        console.log("error");
      }
      this.products = res.data;
      this.totalPage = res.totalPage;
      console.log(this.products);
    })
  }
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     $(document).ready( function () {
  //       $('#example').DataTable();
  //   } );
      
  //   }, 3000);
  // }
}
