// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary/cloudinary-response';
import {ProductsService} from  'src/products/products.service'
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor(
    private ProductoService: ProductsService,
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
        };
      });

     this.ProductoService.saveimg(decodedToken.enterprise_id,id,res)
    });

    return Promise.all(uploadPromises);
  
  
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