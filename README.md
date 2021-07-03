# Proyecto2MIA

## Entidad Relacion
![Screenshot 2021-07-02 231231](https://user-images.githubusercontent.com/48371383/124343713-fe19b700-db8a-11eb-9584-379424d16ed1.png)

## DDL

### Tabla Usuario
>CREATE TABLE USUARIO (
  USER_ID NUMBER GENERATED ALWAYS AS IDENTITY NOT NULL, 
  FULLNAME VARCHAR2(256) NOT NULL, 
  USERNAME VARCHAR2(32) NOT NULL, 
  PASSWORD VARCHAR2(256) NOT NULL, 
  PICTURE LONG VARCHAR NOT NULL, 
  BOT_MODE INT DEFAULT 0, 
  CONSTRAINT pk_user_id PRIMARY KEY (USER_ID)
);
### Tabla Conexion
>CREATE TABLE CONEXION(
	CONNECTION_ID NUMBER GENERATED ALWAYS AS IDENTITY NOT NULL,
	FIRST_USER_ID NUMBER NOT NULL,
	SECOND_USER_ID NUMBER NOT NULL,
	SEND_DATE DATE NOT NULL,
	CONFIRM_DATE TIMESTAMP,
	STATE INT DEFAULT 0,
	CONSTRAINT pk_conexion PRIMARY KEY(CONNECTION_ID),
	CONSTRAINT fk_fuser_conexion FOREIGN KEY(FIRST_USER_ID)
		REFERENCES USUARIO(USER_ID),
	CONSTRAINT fk_suser_conexion FOREIGN KEY(SECOND_USER_ID)
		REFERENCES USUARIO(USER_ID)
);
### Tabla Publicacion
>CREATE TABLE PUBLICACION(
	POST_ID NUMBER GENERATED ALWAYS AS IDENTITY NOT NULL,
	USER_ID NUMBER NOT NULL,
	POST_DATE DATE NOT NULL,
	POST_TAGS VARCHAR2(512),
	PICTURE BLOB NOT NULL,
	PICTURE_TAGS VARCHAR2(512),
	CONTENT VARCHAR2(512),
	CONSTRAINT pk_publicacion PRIMARY KEY(POST_ID),
	CONSTRAINT fk_user_publicacion FOREIGN KEY(USER_ID)
		REFERENCES USUARIO(USER_ID),
	CONSTRAINT ensure_json_post CHECK(POST_TAGS IS JSON),
	CONSTRAINT ensure_json_picture CHECK(PICTURE_TAGS IS JSON)
);
### Tabla Etiqueta
>CREATE TABLE ETIQUETA(
	TAG_ID NUMBER GENERATED ALWAYS AS IDENTITY NOT NULL,
	TAG_NAME VARCHAR(32) NOT NULL,
	USAGE_COUNT NUMBER DEFAULT 0,
	CONSTRAINT pk_etiqueta PRIMARY KEY(TAG_ID)
);
### Tabla Mensaje
>CREATE TABLE MENSAJE(
	MESSAGE_ID NUMBER GENERATED ALWAYS AS IDENTITY NOT NULL,
	CONNECTION_ID NUMBER NOT NULL,
	USER_ID NUMBER NOT NULL,
	CONTENT VARCHAR(512),
	SEND_DATE TIMESTAMP,
	CONSTRAINT pk_mensaje PRIMARY KEY(MESSAGE_ID),
	CONSTRAINT fk_mensaje_conexion FOREIGN KEY(CONNECTION_ID)
		REFERENCES CONEXION(CONNECTION_ID),
	CONSTRAINT fk_mensaje_usuario FOREIGN KEY(USER_ID)
		REFERENCES USUARIO(USER_ID)
);

## DML

### Procedimiento para crear usuario
>CREATE OR REPLACE PROCEDURE crearUsuario (var_usuario IN VARCHAR2, var_password IN VARCHAR2, var_fullname IN VARCHAR2, var_picture IN VARCHAR) AS
	cod_user NUMBER;
	CURSOR c1 is SELECT COUNT(*) FROM proyecto.usuario WHERE usuario.username = var_usuario;
	BEGIN
	    OPEN c1;
	    FETCH c1 INTO cod_user;
	    CLOSE c1;
	    IF cod_user = 0 THEN
	        INSERT INTO usuario(fullname, username, password, picture) VALUES(var_fullname, var_usuario, 
	        (SELECT DBMS_OBFUSCATION_TOOLKIT.MD5 (input => UTL_RAW.CAST_TO_RAW (var_password)) HASH_KEY FROM DUAL), var_picture);
	    END IF;
	END;
### Procedimiento para generar una nueva conexion
>CREATE OR REPLACE PROCEDURE nuevoAmigo(var_usuario1 IN VARCHAR2, var_usuario2 IN VARCHAR2)
	AS
	cod_id_1 NUMBER;
	cod_id_2 NUMBER;
	resultado NUMBER;
	CURSOR c1 is SELECT user_id FROM proyecto.usuario WHERE usuario.username = var_usuario1;
	CURSOR c2 is SELECT user_id FROM proyecto.usuario WHERE usuario.username = var_usuario2;
	CURSOR c3 is SELECT COUNT(*) FROM proyecto.conexion WHERE (conexion.first_user_id = cod_id_1 AND conexion.second_user_id = cod_id_2) OR (conexion.first_user_id = cod_id_2 AND conexion.second_user_id = cod_id_1);
	BEGIN
	    OPEN c1;
	    FETCH c1 INTO cod_id_1;
	    CLOSE c1;
	    OPEN c2;
	    FETCH c2 INTO cod_id_2;
	    CLOSE c2;
	    OPEN c3;
	    FETCH c3 INTO resultado;
	    CLOSE c3;
	    IF resultado = 0 THEN
	        INSERT INTO proyecto.conexion(conexion.first_user_id, conexion.second_user_id, conexion.send_date, conexion.state)
	            VALUES(cod_id_1, cod_id_2, (SELECT LOCALTIMESTAMP FROM DUAL), 0); 
	    END IF;
	END;
### Procedimiento para enviar un mensaje
>CREATE OR REPLACE PROCEDURE enviarMensaje(id_conexion IN NUMBER, id_usuario IN NUMBER, mensaje IN VARCHAR2)
	AS
	estado NUMBER;
	CURSOR c1 IS SELECT conexion.connection_id FROM proyecto.conexion WHERE conexion.connection_id = id_conexion;
	BEGIN
	    OPEN c1;
	    FETCH c1 INTO estado;
	    CLOSE c1;
	    IF estado = 1 THEN
	        INSERT INTO mensaje(connection_id, user_id, content, send_date) VALUES(id_conexion, id_usuario, mensaje, LOCALTIMESTAMP);
	    END IF;
	END;
### Funcion para verificar el login
>CREATE OR REPLACE FUNCTION login(var_usuario IN VARCHAR2, var_password IN VARCHAR2)
	RETURN NUMBER
	IS
	cod_id NUMBER;
	CURSOR c1 is SELECT COUNT(*) FROM proyecto.usuario WHERE usuario.username = var_usuario AND
	    usuario.password = (SELECT DBMS_OBFUSCATION_TOOLKIT.MD5 (input => UTL_RAW.CAST_TO_RAW (var_password)) HASH_KEY FROM DUAL);
	BEGIN
	    OPEN c1;
	    FETCH c1 INTO cod_id;
	    CLOSE c1;
	    RETURN(cod_id);
	END;
### Queries
#### - Obtener datos de usuario
>SELECT user_id, fullname, picture FROM proyecto.usuario;
#### - Obtener los usuarios que no son amigos
> SELECT conexion.first_user_id AS codigo, usuario.fullname AS nombre FROM proyecto.usuario
	JOIN proyecto.conexion ON (conexion.first_user_id = usuario.user_id)
	WHERE conexion.second_user_id = (SELECT usuario.user_id FROM proyecto.usuario WHERE usuario.username = 'jared123')
	UNION
	SELECT conexion.second_user_id AS codigo, usuario.fullname AS nombre FROM proyecto.usuario
	JOIN proyecto.conexion ON (conexion.second_user_id = usuario.user_id)
	WHERE conexion.first_user_id = (SELECT usuario.user_id FROM proyecto.usuario WHERE usuario.username = 'jared123');
#### - Actualizar un usuario
>UPDATE proyecto.usuario
	SET usuario.fullname = 'Usuario Bot', usuario.password = (SELECT DBMS_OBFUSCATION_TOOLKIT.MD5 (input => UTL_RAW.CAST_TO_RAW ('password123')) HASH_KEY FROM DUAL),
	usuario.picture = hextoraw('453d7a34'), usuario.bot_mode = 1
	WHERE usuario.username = 'usuario1' AND usuario.password = (SELECT DBMS_OBFUSCATION_TOOLKIT.MD5 (input => UTL_RAW.CAST_TO_RAW ('password123')) HASH_KEY FROM DUAL);
#### - Obtener los mensajes de una conexion
>SELECT * FROM proyecto.mensaje WHERE mensaje.connection_id = 1 ORDER BY mensaje.send_date DESC;
>
## Arquitectura Implementada

![Screenshot 2021-07-02 231116](https://user-images.githubusercontent.com/48371383/124343701-de828e80-db8a-11eb-8cd7-cf47ada749b5.png)

## Oracle Version

![Screenshot 2021-07-02 231354](https://user-images.githubusercontent.com/48371383/124343752-3a4d1780-db8b-11eb-8732-04fb17f297ca.png)
