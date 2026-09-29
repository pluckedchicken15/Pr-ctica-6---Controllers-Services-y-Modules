import { 
  Body, 
  ConflictException, 
  Controller, 
  Delete, 
  Get, 
  NotFoundException, 
  Param, 
  Post, 
  Res 
} from '@nestjs/common';
import type { Response } from 'express';
import { InscripcionesService } from './inscripciones.service.js';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto.js';
import * as crearInscripcionDto from './dto/crear-inscripcion.dto.js';
import { 
  CupoLlenoError, 
  HorarioNoEncontradoError, 
  InscripcionDuplicadaError, 
  MiembroNoEncontradoError 
} from './dominio/errores.js';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly servicio: InscripcionesService) {}

  @Get()
  async listar() {
    const lista = await this.servicio.listar();
    return lista.map(aInscripcionDto);
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const inscripcion = await this.servicio.buscar(Number(id));
    if (!inscripcion) {
      throw new NotFoundException('No existe la inscripcion');
    }
    return aInscripcionDto(inscripcion);
  }

  @Post()
  async crear(
    @Body() dto: crearInscripcionDto.CrearInscripcionDto,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const nuevaInscripcion = await this.servicio.crear(dto);

      // Cabecera Location requerida
      res.setHeader('Location', `/inscripciones/${nuevaInscripcion.id}`);

      return aInscripcionDto(nuevaInscripcion);
    } catch (error) {
      // Mapeo de errores de dominio a Excepciones HTTP
      if (error instanceof HorarioNoEncontradoError || error instanceof MiembroNoEncontradoError) {
        throw new NotFoundException(error.message); // 404
      }
      if (error instanceof InscripcionDuplicadaError || error instanceof CupoLlenoError) {
        throw new ConflictException(error.message); // 409
      }
      throw error; // Lanza 500 solo si es un error no previsto
    }
  }

  @Delete(':id')
  async cancelar(@Param('id') id: string) {
    const inscripcionCancelada = await this.servicio.cancelar(Number(id));

    if (!inscripcionCancelada) {
      throw new NotFoundException('No existe la inscripcion');
    }
    return { mensaje: 'Inscripcion cancelada' };
  }
}