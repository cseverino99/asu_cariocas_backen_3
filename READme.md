# Entrega 2
## Asu-cariocas
### Por Agustín Urzua y Cristobal Severino

Para esta entrega se trabajó en la definición e implementación del back-end que da soporte a las funcionalidades del juego en "carioca". A continuación se presenta la documentación para cada parte de la app, incluyendo los códigos necesarios para correr las dependencias de la API y las instrucciones para levantar la BDD. Además se incluye un diagrama el cual muestra las entidades y las relaciones del juego y una descripción de los endpoints creados para el juego.

![Texto](/Diagrama%20ER.jpg)

Para simplificar la concepción del modelo, dejamos un Diagrama que muestra las entidades aquí se pueden ver las relaciones entre cada entidad. Se puede ver que la primera entidad en crearse en "User", este tiene un "Player" del cuál dependen las entidades de "Mazo" y "Cartas". Todas estas encitdades se relaciones en "Games" o salas de juegos.

A partir del diagrama también se pueden identificar las "Llaves foráneas"

# Base de datos en PosgreSQL
Para poder iniciar la BDD es necesario tener un archivo ".env" el cuál debe contener las credenciales preveamente creadas en psql para ingresar a la base de datos.

para el caso de nuestro proyecto este archivo tiene la siguiente forma: 

    DB_USERNAME = cseverino99_web

    DB_PASSWORD = 12345678

    DB_NAME = asu_cariocas

    DB_HOST = 'localhost'

# API 