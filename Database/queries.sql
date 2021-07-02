--Procedimiento para crear usuario
	CREATE OR REPLACE PROCEDURE crearUsuario (var_usuario IN VARCHAR2, var_password IN VARCHAR2, var_fullname IN VARCHAR2, var_picture IN BLOB) AS
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
	--LLamando a crearUsuario
					--usuario 	    contraseña	     nombre		   picture
	CALL crearUsuario('jared123', 'password123', 'Jared Lopez', hextoraw('453d7a34'));

--Funcion para generar el login >> respuesta != 0 -> los datos son correctos
	CREATE OR REPLACE FUNCTION login(var_usuario IN VARCHAR2, var_password IN VARCHAR2)
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
	--Llamando al login
	SELECT login('jared123','pass1234') AS resultado FROM DUAL;

--Query para obtener los datos de los usuarios para mostrar
	SELECT user_id, fullname, picture FROM proyecto.usuario;

--Query para obtener los datos de los usuarios que son amigos no pude obtener el blob de la foto
	SELECT conexion.first_user_id AS codigo, usuario.fullname AS nombre FROM proyecto.usuario
	JOIN proyecto.conexion ON (conexion.first_user_id = usuario.user_id)
	WHERE conexion.second_user_id = (SELECT usuario.user_id FROM proyecto.usuario WHERE usuario.username = 'jared123')
	UNION
	SELECT conexion.second_user_id AS codigo, usuario.fullname AS nombre FROM proyecto.usuario
	JOIN proyecto.conexion ON (conexion.second_user_id = usuario.user_id)
	WHERE conexion.first_user_id = (SELECT usuario.user_id FROM proyecto.usuario WHERE usuario.username = 'jared123');

--Procedimiento para generar una conexion (generar amigos)
	CREATE OR REPLACE PROCEDURE nuevoAmigo(var_usuario1 IN VARCHAR2, var_usuario2 IN VARCHAR2)
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
	--Llamando a nuevoAmigo
	CALL nuevoAmigo('eleazar123', 'jared123');

--Procedimiento para update de usuario
	UPDATE proyecto.usuario
	SET usuario.fullname = 'Usuario Bot', usuario.password = (SELECT DBMS_OBFUSCATION_TOOLKIT.MD5 (input => UTL_RAW.CAST_TO_RAW ('password123')) HASH_KEY FROM DUAL),
	usuario.picture = hextoraw('453d7a34'), usuario.bot_mode = 1
	WHERE usuario.username = 'usuario1' AND usuario.password = (SELECT DBMS_OBFUSCATION_TOOLKIT.MD5 (input => UTL_RAW.CAST_TO_RAW ('password123')) HASH_KEY FROM DUAL);

FALTAN PUBLICACIONES (Crear un trigger para aumentar o crear un nuevo tag)
--Procedimiento para enviar mensaje
	CREATE OR REPLACE PROCEDURE enviarMensaje(id_conexion IN NUMBER, id_usuario IN NUMBER, mensaje IN VARCHAR2)
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
	--Llamando a enviarMensaje
	--id de la conexion, id del usuario que envia el mensaje, mensaje
	CALL enviarMensaje(1, 1, 'Hola este es el segundo mensaje');

--Query para obtener los mensajes de una conexion
	SELECT * FROM proyecto.mensaje WHERE mensaje.connection_id = 1 ORDER BY mensaje.send_date DESC;

--Query para obtener el id de un tag
	SELECT etiqueta.tag_id FROM proyecto.etiqueta WHERE etiqueta.tag_name = '';

--Query para insertar un nuevo tag
	INSERT INTO proyecto.etiqueta(tag_name) VALUES('');

--Query para obtener a todos los usuarios que no son amigos
	SELECT usuario.user_id, usuario.fullname, usuario.picture FROM proyecto.usuario WHERE usuario.user_id NOT IN
	(
		SELECT conexion.first_user_id FROM proyecto.usuario
		JOIN proyecto.conexion ON (conexion.first_user_id = usuario.user_id)
		WHERE conexion.second_user_id = 1
		UNION
		SELECT conexion.second_user_id FROM proyecto.usuario
		JOIN proyecto.conexion ON (conexion.second_user_id = usuario.user_id)
		WHERE conexion.first_user_id = 1
	) 
	AND usuario.user_id != 1;