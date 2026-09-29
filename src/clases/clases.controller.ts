import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClasesService } from './clases.service.js';
import type{ Clase } from './clases.service.js';

@Controller('clases')
export class ClasesController {

constructor(
    private readonly clasesService: ClasesService
){}

   @Get('clases')
     listar(): Clase[] {
       return this.clasesService.listar();
     }
   
   
     @Post('clases')
     crear(@Body() cuerpo: {nombre: string; hora: string; instructor: string;}): Clase {        
        return this.clasesService.crear(cuerpo.nombre, cuerpo.hora, cuerpo.instructor);
     }
   


}
