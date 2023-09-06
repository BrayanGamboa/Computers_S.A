-- Si existe las secuencias las eliminamos, para no tener posibles errores
DROP SEQUENCE IF EXISTS id_pedido_seq CASCADE;
DROP SEQUENCE IF EXISTS id_cantidad_producto_seq CASCADE;
DROP SEQUENCE IF EXISTS id_direccion_seq CASCADE;
DROP SEQUENCE IF EXISTS id_productos_seq CASCADE;

-- Eliminar los tipos, para evitar posibles errores
DROP TYPE IF EXISTS estado_pedido CASCADE;
DROP TYPE IF EXISTS datos_extra CASCADE;
DROP TYPE IF EXISTS tipo_via CASCADE;

--Elimar las tablas (en caso que existan)
DROP TABLE IF EXISTS pedido,
cantidad_producto,
direccion,
producto;

--Creamos una serie de secuencias con el objetivo de tener un mayor control en la base de datos.
CREATE SEQUENCE id_productos_seq START WITH 1 INCREMENT BY 1 MAXVALUE 1499 MINVALUE 1;
CREATE SEQUENCE id_cantidad_producto_seq START WITH 1500 INCREMENT BY 1 MAXVALUE 2999 MINVALUE 1500;
CREATE SEQUENCE id_pedido_seq START WITH 3000 INCREMENT BY 1 MAXVALUE 4499 MINVALUE 3000;
CREATE SEQUENCE id_direccion_seq START WITH 4500 INCREMENT BY 1 MAXVALUE 5999 MINVALUE 4500;
-- Se crea un type, para tener controladas las respuestas posibles en la base de datos
CREATE TYPE estado_pedido AS ENUM (
    'Realizado',
    'En Bodega',
    'En camino',
    'Entregado',
    'Cancelado'
);
CREATE TYPE tipo_via AS ENUM ('Calle', 'Carrera');
CREATE TYPE datos_extra AS ENUM ('APP', 'INT');
--Creación de tablas
CREATE TABLE producto (
    id_producto INT DEFAULT NEXTVAL('id_productos_seq'),
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL,
    CONSTRAINT pk_productos PRIMARY KEY (id_producto)
);
CREATE TABLE direccion (
    id_direccion INT DEFAULT NEXTVAL('id_direccion_seq'),
    tipo_via tipo_via NOT NULL,
    numero_via INT NOT NULL,
    letra_via VARCHAR(3) NOT NULL,
    numero_cuadra INT NOT NULL,
    numero_casa INT NOT NULL,
    datos_extra datos_extra,
    numero_extra INT,
    CONSTRAINT pk_direccion PRIMARY KEY (id_direccion)
);

CREATE TABLE pedido(
    id_pedido INT DEFAULT NEXTVAL('id_pedido_seq'),    
    id_direccion INT NOT NULL,
    estado estado_pedido NOT NULL,
    CONSTRAINT pk_pedido PRIMARY KEY (id_pedido),
    CONSTRAINT fk_pedido_y_direccion FOREIGN KEY (id_direccion) REFERENCES direccion(id_direccion)
);

CREATE TABLE cantidad_producto(
    id_cantidad_producto INT DEFAULT NEXTVAL('id_cantidad_producto_seq'),
    id_producto INT NOT NULL,
    id_pedido INT NOT NULL,
    cantidad INT NOT NULL,
    CONSTRAINT pk_cantidad_producto PRIMARY KEY (id_cantidad_producto),
    CONSTRAINT fk_cantidad_producto_y_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    CONSTRAINT fk_cantidad_producto_y_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
);
--Datos de prueba
INSERT INTO producto (nombre, descripcion, cantidad)
VALUES ('Producto 1', 'Descripción del producto 1', 10),
    ('Producto 2', 'Descripción del producto 2', 15),
    ('Producto 3', 'Descripción del producto 3', 20),
    ('Producto 4', 'Descripción del producto 4', 5),
    ('Producto 5', 'Descripción del producto 5', 8),
    ('Producto 6', 'Descripción del producto 6', 12),
    ('Producto 7', 'Descripción del producto 7', 18),
    ('Producto 8', 'Descripción del producto 8', 3),
    ('Producto 9', 'Descripción del producto 9', 6),
    ('Producto 10', 'Descripción del producto 10', 9);
INSERT INTO direccion (
        tipo_via,
        numero_via,
        letra_via,
        numero_cuadra,
        numero_casa,
        datos_extra,
        numero_extra
    )
VALUES ('Calle', 123, 'A', 1, 5, 'APP', 10),
    ('Carrera', 456, 'B', 2, 10, 'INT', 20),
    ('Calle', 789, 'C', 3, 15, 'APP', 30),
    ('Carrera', 987, 'D', 4, 20, 'INT', 40),
    ('Calle', 654, 'E', 5, 25, 'APP', 50),
    ('Carrera', 321, 'F', 6, 30, 'INT', 60),
    ('Calle', 987, 'G', 7, 35, 'APP', 70),
    ('Carrera', 654, 'H', 8, 40, 'INT', 80),
    ('Calle', 321, 'I', 9, 45, 'APP', 90),
    ('Carrera', 789, 'J', 10, 50, 'INT', 100);

INSERT INTO pedido (id_direccion, estado)
VALUES (4500, 'Realizado'),
        (4501, 'En Bodega'),
        (4502, 'En camino'),
        (4503, 'Entregado'),
        (4504, 'Cancelado'),
        (4505, 'Realizado'),
        (4506, 'En Bodega'),
        (4507, 'En camino'),
        (4508, 'Entregado'),
        (4509, 'Cancelado');

INSERT INTO cantidad_producto (id_producto, cantidad, id_pedido)
VALUES (1, 5, 3000),
        (2, 10, 3001),
        (3, 15, 3002),
        (4, 20, 3003),
        (5, 25, 3004),
        (6, 30, 3005),
        (7, 35, 3006),
        (8, 40, 3007),
        (9, 45, 3008),
        (10, 50, 3009);
SELECT * FROM direccion;
SELECT * FROM cantidad_producto;
SELECT * FROM pedido;
SELECT * FROM producto;