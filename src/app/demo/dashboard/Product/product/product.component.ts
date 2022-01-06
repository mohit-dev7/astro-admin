import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {  
  FormGroup,
  FormControl,
  Validators } from '@angular/forms';
import { data } from 'jquery';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  error:boolean = false;

  message:any = '';

  categoryList:any;
  variantList:any;

  category:FormGroup;
  name = new FormControl("", [Validators.required]);
  code = new FormControl("", [Validators.required]);

  public variant: FormGroup;
  variantName = new FormControl("",[Validators.required]);

  public product: FormGroup;
  productName = new FormControl("",[Validators.required]);
  description  = new FormControl("",[Validators.required]);
  categoryId = new FormControl("",[Validators.required]);
  variantId = new FormControl("",[Validators.required]);
  status = new FormControl("",[Validators.required]);
  price = new FormControl("",[Validators.required]);
  quantity = new FormControl("",[Validators.required]);
  brand = new FormControl("",[Validators.required]);






  constructor(private authService:AuthService,private router:Router){
    this.category = new FormGroup({
      name: new FormControl(''),
      code: new FormControl(''),
    });

    this.variant = new FormGroup({
        name : new FormControl('')
      });

    this.product = new FormGroup({
      productName : new FormControl(''),
      description  : new FormControl(''),
      categoryId : new FormControl(''),
      variantId : new FormControl(''),
      status : new FormControl(''),
      price : new FormControl(''),
      quantity : new FormControl(''),
      brand : new FormControl(''),
    })
  }


  

  ngOnInit(): void {

    this.authService.getRequest("/GetCategories")
    .subscribe((data)=>{
      console.log(data);
      if(data.length < 1){
        console.log("error")
      }
      this.categoryList = data;
    });

    this.authService.getRequest("/getAllVariants")
    .subscribe((data)=>{
      console.log(data);  
      if(data.length < 1){
        console.log("error")
      }
      this.variantList = data;
    },(err)=>{
      debugger;
      console.log(err);
      this.router.navigate(['/auth/signin']);
    })

  }

  addVariants(){
    this.variantName = this.variant.get("name").value
    let data = {"name":this.variantName}
    // console.log(data);
    this.authService.postRequest("/addVariant",data)
    .subscribe((data)=>{
        if(data.length < 1){
          console.log("error")
          return
        }
        console.log("variant add");
    },(err)=>{
      debugger;
      console.log("error="+err);
      this.router.navigate(['/auth/signin']);
    });
  }

  addCategory(){
    this.name = this.category.get("name").value;
    this.code = this.category.get("code").value;
    let data = {"name":this.name,"code":this.code}
    console.log(data);
    this.authService.postRequest("/AddCategory",data)
    .subscribe((data)=>{
        if(!data.status){
          console.log("error");
        }
        console.log("hello")
        setTimeout(() => {
          console.log("removehello")
        }, 1000);
      })
  }


  addProduct(){

    this.productName = this.product.get("productName").value
    this.status = this.product.get("status").value
    this.brand = this.product.get("brand").value
    this.categoryId = this.product.get("categoryId").value
    this.variantId = this.product.get("variantId").value
    this.price = this.product.get("price").value
    this.quantity = this.product.get("quantity").value
    this.description = this.product.get("description").value
    if(String(this.productName) == ''){
      this.error = true; 
      this.message = 'Please Enter Product Name ';
      return false;

    }

    if(String(this.brand) == ''){
      this.error = true; 
      this.message = 'Please Enter Brand Name.';
      return false;

    }

    if(String(this.categoryId) == ''){
      this.error = true; 
      this.message = 'Please Select category';
      return false;

    }

    if(String(this.variantId) == ''){
      this.error = true; 
      this.message = 'Please Select variant';
      return false;

    }

    if(String(this.price) == ''){
      this.error = true; 
      this.message = 'Please Enter price';
      return false;

    }

    if(String(this.quantity) == ''){
      this.error = true; 
      this.message = 'Please Enter no of stock you have.';
      return false;

    }

    if(String(this.description) == ''){
      this.error = true; 
      this.message = 'Please Enter Product information.';
      return false;

    }


    let data = {   
      "brand":this.brand,
      "description":this.description,
       "category":{"id":this.categoryId},
      "status":this.status??0,
      "name":this.productName,
      "variants" :[{"id":this.variantId,"price":this.price,"quantity":this.quantity}]
  }
    // console.log(data);
    this.authService.postRequest("/product/insert",data).subscribe((res)=>{
      if(!res.status){
        this.error = true; 
        this.message = 'Product Not Create. Please Try Again.';
        return false;
      }
      this.error = false; 
      this.product.reset();
      this.message = 'Product Create Successfully';
      return false;
    })
  }
}
