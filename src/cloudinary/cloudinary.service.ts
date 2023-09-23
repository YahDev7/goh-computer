// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary/cloudinary-response';
import {ProductsService} from  'src/products/products.service'
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
import { MovimientoMService } from 'src/movimiento-m/movimiento-m.service';
import { CategoriaService } from 'src/categoria/categoria.service';
import { SubcategoriaService } from 'src/subcategoria/subcategoria.service';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor(
    private ProductoService: ProductsService,
    private MovimientoService: MovimientoMService,
    private CategoriaService: CategoriaService,
    private SubCategoriaService: SubcategoriaService,
    
    private jwtService: JwtService,

  ){}
/*   uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'GOHComputer' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  } */

  uploadFile(files: Express.Multer.File[],token:string,id:ObjectId): Promise<CloudinaryResponse[]> {
  
    const decodedToken = this.jwtService.verify(token);

    const uploadPromises: Promise<CloudinaryResponse>[] = [];
    files.forEach((file) => {
      const uploadPromise = new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'GOHComputer/Productos',
            allowed_formats: ['jpg', 'png', 'svg'],
            max_allowed_size: 2000000, // 2MB en bytes
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      uploadPromises.push(uploadPromise);
    });
    
    
/*       let res= uploadPromises.map((el)=>{
        return{
        nombre:el["public_id"],
        URL:el["secure_url"]
      }
    }) */

    Promise.all(uploadPromises).then((results) => {

      let res= results.map((el) => {
        return {
          nombre: el.public_id,
          URL: el.secure_url,
          public_id:el.public_id
        };
      });

     this.ProductoService.saveimg(decodedToken.enterprise_id,id,res)
    });

    return Promise.all(uploadPromises);
  
  
  }

  
  uploadFileBilletera(file: Express.Multer.File,token:string,id:ObjectId): Promise<CloudinaryResponse> {
  
    const decodedToken = this.jwtService.verify(token);

    let uploadfile= new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
         folder: 'GOHComputer/Billetera_virtual/Yape' ,
        allowed_formats: ['jpg', 'png'],
        max_allowed_size: 1000000, // 2MB en bytes
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    uploadfile.then((resultado) => {
      // Hacer algo con el resultado
    let res ={
      nombre:resultado.public_id,
      URL: resultado.secure_url,
    }
    this.MovimientoService.saveimg(decodedToken.enterprise_id,id,res)
    }).catch((error) => {
      return {err:true,message:"ocurrio un error al subir el archivo"}
    });

    
    return uploadfile;

  
  } 




uploadProductos(file: Express.Multer.File,token:string,id:ObjectId): Promise<CloudinaryResponse> {
  
    const decodedToken = this.jwtService.verify(token);

    let uploadfile= new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
         folder: 'GOHComputer/Productos' ,
        allowed_formats: ['jpg', 'png'],
        max_allowed_size: 1000000, // 2MB en bytes
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
   
    uploadfile.then((resultado) => {
      // Hacer algo con el resultado
      console.log(resultado)

    let res ={
      nombre:resultado.public_id,
      URL: resultado.secure_url,
      public_id:resultado.public_id
    }
    this.ProductoService.saveimgAll(decodedToken.enterprise_id,id,res)
    }).catch((error) => {
      console.log(error)
      return {err:true,message:"ocurrio un error al subir el archivo"}
    });

    
    return uploadfile;

  
  } 

  uploadCategoria(file: Express.Multer.File,token:string,id:ObjectId): Promise<CloudinaryResponse> {
  
    const decodedToken = this.jwtService.verify(token);

    let uploadfile= new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
         folder: 'GOHComputer/categoria' ,
        allowed_formats: ['jpg', 'png'],
        max_allowed_size: 1000000, // 2MB en bytes
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    uploadfile.then((resultado) => {
      // Hacer algo con el resultado
    let res ={
      nombre:resultado.public_id,
      URL: resultado.secure_url,
    }
    this.CategoriaService.saveimg(decodedToken.enterprise_id,id,res)
    }).catch((error) => {
      return {err:true,message:"ocurrio un error al subir el archivo"}
    });

    
    return uploadfile;

  
  } 
  uploadSubCategoria(file: Express.Multer.File,token:string,id:ObjectId): Promise<CloudinaryResponse> {
  
    const decodedToken = this.jwtService.verify(token);

    let uploadfile= new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
         folder: 'GOHComputer/subcategoria' ,
        allowed_formats: ['jpg', 'png'],
        max_allowed_size: 1000000, // 2MB en bytes
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    uploadfile.then((resultado) => {
      // Hacer algo con el resultado
    let res ={
      nombre:resultado.public_id,
      URL: resultado.secure_url,
    }
    this.SubCategoriaService.saveimg(decodedToken.enterprise_id,id,res)
    }).catch((error) => {
      return {err:true,message:"ocurrio un error al subir el archivo"}
    });

    
    return uploadfile;

  
  } 
     async deleteOneImg(publicId: string) {
    return await cloudinary.uploader.destroy(publicId);
  } 

}


/* 
export class CloudinaryService {

  uploadFiles(files: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
  
    const uploadPromises: Promise<CloudinaryResponse>[] = [];

    files.forEach((file) => {
      const uploadPromise = new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'GOHComputer',
            allowed_formats: ['jpg', 'png', 'svg'],
            max_allowed_size: 2000000, // 2MB en bytes
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      uploadPromises.push(uploadPromise);
    });

    return Promise.all(uploadPromises);
  
  
  }

} */