import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";


export const CORS :CorsOptions={
    credentials: true,
    origin:['http://127.0.0.1:5173','https://boisterous-kringle-fbc71c.netlify.app','https://gohcomputer.netlify.app'],
    methods: ["GET", "POST","PUT","DELETE"],
  }