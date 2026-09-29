import { Injectable } from '@nestjs/common';
export interface Clase {
  id: number;
  nombre: string;
  hora: string;
  instructor: string;
}

const clases: Clase[] = [
  {
    id: 1,
    nombre: 'yoga',
    hora: '3:00pm',
    instructor: 'Manuel Turizo',
  },
  {
    id: 2,
    nombre: 'spinning',
    hora: '6:00pm',
    instructor: 'Christian Nodal',
  },
];

@Injectable()
export class ClasesService {
    listar(): Clase[]{
        return clases;
    }

    crear(nombre: string, hora: string, instructor: string): Clase{
      const nueva: Clase = {id: clases.length + 1, nombre: nombre, hora: hora, instructor: instructor};
      clases.push(nueva);
      return nueva;
    }


}
