CREATE TABLE USUARIO (
  USER_ID NUMBER GENERATED ALWAYS AS IDENTITY NOT NULL, 
  FULLNAME VARCHAR2(256) NOT NULL, 
  USERNAME VARCHAR2(32) NOT NULL, 
  PASSWORD VARCHAR2(256) NOT NULL, 
  PICTURE BLOB NOT NULL, 
  BOT_MODE INT DEFAULT 0, 
  CONSTRAINT pk_user_id PRIMARY KEY (USER_ID)
);
CREATE TABLE CONEXION(
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
CREATE TABLE PUBLICACION(
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
CREATE TABLE ETIQUETA(
	TAG_ID NUMBER GENERATED ALWAYS AS IDENTITY NOT NULL,
	TAG_NAME VARCHAR(32) NOT NULL,
	USAGE_COUNT NUMBER DEFAULT 0,
	CONSTRAINT pk_etiqueta PRIMARY KEY(TAG_ID)
);
CREATE TABLE MENSAJE(
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