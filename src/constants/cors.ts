import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";


export const CORS :CorsOptions={
    credentials: true,
    origin:['http://localhost:5173','https://gohcomputer.netlify.app'],
    methods: ["GET", "POST","PUT","DELETE"],
  }