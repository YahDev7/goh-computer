// app.controller.ts
import {
  Body,
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
  constructor(private readonly cloudinaryService: CloudinaryService) { }

  /*  @Post('upload')
   @UseInterceptors(FileInterceptor('file'))
   uploadImage(@UploadedFile() file: Express.Multer.File) {
       
     return this.cloudinaryService.uploadFile(file);
   } */

  /*   @Post('upload/product/:id')
    @UseInterceptors(FilesInterceptor('files', 3))
    async uploadImage(@Param('id') id:ObjectId,@UploadedFiles() files: Express.Multer.File[],@Req() req) {

      console.log("files",files)
      const token = req.headers.authorization.split(' ')[1];

      return this.cloudinaryService.uploadFile(files,token,id);

      
    } */
  @Post('upload/product/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id') id: ObjectId, @UploadedFile() file: Express.Multer.File, @Req() req) {

    const token = req.headers.authorization.split(' ')[1];

    return this.cloudinaryService.uploadProductos(file, token, id);

  }


  @Post('/product/delete')
  async deleteOneImg(@Body() body /* , @UploadedFile() file: Express.Multer.File, @Req() req */) {
    let {public_id}=body
  //  const token = req.headers.authorization.split(' ')[1];

    return this.cloudinaryService.deleteOneImg(public_id);

  }

  @Post('upload/billeteravirtual/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBilleteraVirtual(@Param('id') id_mov: ObjectId, @UploadedFile() file: Express.Multer.File, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];

    return this.cloudinaryService.uploadFileBilletera(file, token, id_mov);


    /*  const uploadPromises = files.map((file) =>
    this.cloudinaryService.uploadFiles(file)
  );
  const responses = await Promise.all(uploadPromises);
  return responses.map((response) => response.url);  */
  }


  @Post('upload/categoria/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCategoria(@Param('id') id: ObjectId, @UploadedFile() file: Express.Multer.File, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];

    return this.cloudinaryService.uploadCategoria(file, token, id);


  }


  @Post('upload/subcategoria/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSubCategoria(@Param('id') id: ObjectId, @UploadedFile() file: Express.Multer.File, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];

    return this.cloudinaryService.uploadSubCategoria(file, token, id);


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