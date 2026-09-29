1.- ¿Qué pasaría si el módulo no quedara registrado en la raíz?
R. NestJS básicamente no se entera de que el módulo existe. Sus controladores no van a responder, por lo que cualquier petición a esas rutas nos dará un error 404 Not Found, y tampoco podremos usar o inyectar sus servicios en otros lados.

2.- ¿por qué los métodos del repositorio devuelven promesas si los datos van a estar en memoria?
R. Es para simular el comportamiento de una base de datos real. Si desde el principio usamos métodos asíncronos, el día que cambiemos el arreglo en memoria por una base de datos de verdad, no tendremos que modificar la lógica del servicio ni del controlador.

3.- ¿Qué error apareció al cambiar a la interfaz, y por qué la clase sí se había resuelto sola?
R. El error que apareció fue Nest can't resolve dependencies. Ocurre porque las interfaces de TypeScript desaparecen al compilar a JavaScript, así que Nest no tiene cómo saber qué inyectar. En cambio, las clases sí existen en JavaScript cuando el código se ejecuta, por lo que NestJS las reconoce y resuelve automáticamente.

4.- ¿por qué el servicio necesita un token para el repositorio, pero el controlador no lo necesita para el servicio?
R. Porque el controlador inyecta directamente la clase del servicio, la cual sí existe en tiempo de ejecución. Pero el servicio depende de una interfaz para el repositorio, como la interfaz desaparece al compilar, necesitamos indicarle a Nest mediante un token explícito cuál implementación debe inyectar ahí.

5.- ¿Cuál es la diferencia entre un 400 y un 409?
400 Bad Request: Es un error de sintaxis o formato. Ocurre cuando mandamos mal los datos desde el cliente.

409 Conflict: Los datos están bien escritos, pero chocan con el estado actual de la aplicación o base de datos. Por ejemplo, intentar inscribir a un alumno en un horario que ya llenó su cupo máximo o registrar un usuario con un correo que ya existe.

6.- ¿por qué cambió el código de estado de esa última petición?
Porque NestJS asigna los estados de respuesta por defecto según el decorador que usemos. Un método Post devuelve automáticamente un 201 Created cuando se ejecuta con éxito, mientras que los métodos Get, Put o Delete devuelven 200 OK. Si ocurre algún error o excepción, el código cambia automáticamente a un error 400 o 500.


201 CREATED
<img width="1500" height="1030" alt="image" src="https://github.com/user-attachments/assets/a7795497-7476-4081-9aad-55cc30e32234" />

409 CONFLICT
<img width="1505" height="1035" alt="image" src="https://github.com/user-attachments/assets/11795402-980c-4452-a18c-19497e0caa0f" />





