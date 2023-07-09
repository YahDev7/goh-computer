// app.controller.ts
import {
    Controller,
    Param,
    Post,
    Req,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';

  import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtUserAuthGuard } from 'src/user/guards/guard.user';
import { ObjectId } from 'mongodb';
  
@UseGuards(JwtUserAuthGuard/* ,RolesGuard */)

  @Controller('image')
  export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}
  
   /*  @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        
      return this.cloudinaryService.uploadFile(file);
    } */

    @Post('upload/product/:id')
    @UseInterceptors(FilesInterceptor('files', 3))
    async uploadImage(@Param('id') id:ObjectId,@UploadedFiles() files: Express.Multer.File[],@Req() req) {

      console.log(files)
      const token = req.headers.authorization.split(' ')[1];

      return this.cloudinaryService.uploadFile(files,token,id);

        
      /*  const uploadPromises = files.map((file) =>
      this.cloudinaryService.uploadFiles(file)
    );
    const responses = await Promise.all(uploadPromises);
    return responses.map((response) => response.url);  */
    }
  }
  


  /*@Controller('image')
  export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}
  
    @Post('upload')
    @UseInterceptors(FilesInterceptor('file[]', 3))
    async uploadImage(@UploadedFiles() files: Express.Multer.File[]) {
    return  console.log(files)
      return this.cloudinaryService.uploadFiles(files);

        
       const uploadPromises = files.map((file) =>
      this.cloudinaryService.uploadFiles(file)
    );
    const responses = await Promise.all(uploadPromises);
    return responses.map((response) => response.url); 
    }
  }*/