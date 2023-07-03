# grupo-Asuservice-backend
# Entrega 2
## Asu-cariocas
### Por Agustín Urzua y Cristobal Severino

Bibliografía: Se usó chatGPT para hacer algunos códigos. Se encuentran citados en el código. 

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
    
Para instalar la BDD se debe, en primer lugar instalar postgresql, para eso nos basamos en las cápsulas del ramo, específicamente la cápsula 6 de "Configuración Postgres"

Una vez instalado se debe empezar el servidor con el siguiente código

    sudo service postgresql start

Luego para conectarse a la BDD se debe crear el usuario con las credenciales explicadas anteriormente. Es importante que el usaurio que se cree tenga las carácterísticas de SuperUser, para eso se debe correr el código:

    sudo -u postgres createuser --superuser "nombre_usuario"

A continución y como parte más importante, se deben correr las migraciones y las semillas creadas para crear las tablas y poblarlas de datos, con sus respectivas dependencias mostadas en el diagrama. Para ello se deben correr los siguientes código

    **yarn sequelize-cli db:migrate para actualizar la db

    **yarn sequelize-cli db:migrate:undo:all para deshacer las misgraciones

    **yarn sequelize-cl db:seed:all para poblar las tablas creadas

Un ejemplo de lo anterior es el archivo ubicado en la carpeta ´src/seeders/...-seed-mazos.js´ que pobla la tabla "Mazos" pero obteniendo los id de la tabla "Players" y "Tables" para poder identificar que mazo corresponde a cada jugador de y mostrarlo junto con su tablero.

# API 

Una vez que están creadas las tablas y pobladas con las semillas, se debe correr el siguiente código para empezar la apliación y poder hacer uso de las funcionalidades y endpoints

    yarn dev

    Para correr swagger y probar la API vamos al browser y buscamos http://localhost:3000/docs.
    Ahi se puede probar la API, hay que tener en cuenta las vaidaciones

### Validaciones

### User
username: alfanumérico, único
mail: email format, único
password: 8 caracteres, un digito y un caracter

### User
username: alfanumérico, único
mail: email format, único
password: 8 caracteres, un digito y un caracter

### Carta
rank: pertenece a ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
suit: pertenece a ['Spades', 'Hearts', 'Diamonds', 'Clubs']


Los distintos endpoints creados están en la carpeta 'src/routes' a continación una explicación de cada uno de estos.

### users.js

Tiene dos tipos de consulta, POST y GET, el primer endpoint recibe una consulta del tipo POST y se encuentra en "users.create", "/create", la cuál recibe un arreglo del siguiente tipo:
    
    {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "12345password"
    }
Y en caso de cumplir las validaciones crea el usuario con las credenciales dadas.

Los otras consultas son del tipo GET se encuentran en las siguientes ubiaciones:"users.list", "/list" y  "users.show", "/show/:id". Las cuales entregan una lista de usuarios y un usuario por ID

### tables.js

Tiene dos tipos de consulta, POST y GET, el primer endpoint recibe una consulta del tipo POST y se encuentra en "tables.create", "/create", la cuál recibe un arreglo del siguiente tipo:
    
    {
    "gameID": "1",
    "playerID": "1",
    }

Y en caso de cumplir las validaciones crea el tablero con las credenciales dadas.

Los otras consultas son del tipo GET se encuentran en las siguientes ubiaciones:"tables.list", "/list" . Las cuales entregan una lista de tableros con sus atributos correspondientes

### players.js

Tiene dos tipos de consulta, POST y GET, el primer endpoint recibe una consulta del tipo POST y se encuentra en "players.create", "/create", la cuál recibe un arreglo del siguiente tipo:
    
    {
    "gameID": "1",
    "userID": "1",
    }

Y en caso de cumplir las validaciones crea el jugador con las credenciales dadas.

Los otras consultas son del tipo GET se encuentran en las siguientes ubiaciones:"player.list", "/list" . Las cuales entregan una lista de los jugadores

### mazos.js

Tiene un tipos de consulta,  GET,  se encuentran en las siguientes ubiaciones:"mazos.list", "/list" . Las cuales entregan una lista de los jmazos, pero a la vez realizan las consultas as otras tablas para obtener información acerca de los juagdores que poseen estos mazos y las cartas que componen este mazo. Esta es una de las funcionalidades más importantes del juego porque muestra las cartas propias de cada jugador, es decir corresponde a una jugada, a continuación una muestra de como se muestra:

    {
        "mazo": {
            "id": 3,
            "createdAt": "2023-06-01T03:57:45.375Z",
            "updatedAt": "2023-06-01T03:57:45.375Z",
            "playerId": 1
        },
        "cartas": [
            {
                "id": 1,
                "rank": "A",
                "suit": "Spades",
                "mazo_id": 3
            },
            {
                "id": 2,
                "rank": "K",
                "suit": "Hearts",
                "mazo_id": 3
            },
            {
                "id": 3,
                "rank": "Q",
                "suit": "Diamonds",
                "mazo_id": 3
            },
            {
                "id": 4,
                "rank": "J",
                "suit": "Clubs",
                "mazo_id": 3
            }
        ]
    },
    
### games.js

Tiene un tipo de consulta,  GET,  se encuentran en las siguientes ubiaciones:"games.list", "/list" . Las cuales entregan una lista de los juegos, pero a la vez realizan las consultas as otras tablas para obtener información acerca de los juagdores que participan de este juego y los tableros (por lo tantos los mazos y cartas) de cada uno. Esta es una de las funcionalidades más importantes del juego porque muestra las salas de juego y quienes participan en cada uno:

 [
    {
        "game": {
            "id": 1,
            "winnerId": null,
            "createdAt": "2023-06-03T01:30:24.756Z",
            "updatedAt": "2023-06-03T01:30:24.756Z"
        },
        "players": [
            {
                "gameId": 1,
                "id": 1
            },
            {
                "gameId": 1,
                "id": 2
            }
        ],
        "tables": [
            {
                "gameId": 1,
                "id": 1
            },
            {
                "gameId": 1,
                "id": 3
            }
        ]
    }
]