
/* Necesito quitar el nombreJunto en componentes */
CREATE TABLE usuario (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  nombre varchar(20) NOT NULL,
  ap_paterno varchar(20) NOT NULL,
  ap_materno varchar(20) NOT NULL,
  dni varchar(8) NOT NULL unique,
  email varchar(20) NOT NULL unique,
  pass varchar(500) NOT NULL,
  rol varchar(10) NOT NULL,
  user_edit bigint NOT NULL,
  fecha timestamp not null DEFAULT CURRENT_TIMESTAMP,
  estado varchar(10) NOT NULL
)
insert into usuario values(default,'jose','jose','jose','123455','jose','mar','admin',1,default,'A')

CREATE TABLE categoria(
  id bigint NOT NULL primary key GENERATED ALWAYS AS IDENTITY,
  usuario_id bigint NOT NULL,
  nombre varchar(50) NOT NULL,
  imagen varchar(70) DEFAULT NULL,
  url_imagen varchar(500) DEFAULT NULL,
  estado varchar(10) NOT NULL,
  CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario(id)
) 
insert into categoria values(default,1,'laptops',null,null,'A')

CREATE TABLE subcategoria (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  usuario_id bigint NOT NULL,
  categoria_id bigint NOT NULL,
  nombre varchar(50) NOT NULL,
  imagen varchar(70) DEFAULT NULL,
  url_imagen varchar(500) DEFAULT NULL,
  estado varchar(10) NOT NULL,
  CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  CONSTRAINT categoria_id FOREIGN KEY (categoria_id) REFERENCES categoria(id)
)
insert into subcategoria values(default,1,2,'laptop core i5',null,null,'A')



CREATE TABLE componentes (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  subcategoria_id bigint NOT NULL,
  usuario_id bigint NOT NULL,
  codigo varchar(50) NOT NULL unique,
  nombre varchar(100) NOT NULL,
  descripcion varchar(100) DEFAULT NULL,
  palabra_clave varchar(255) DEFAULT NULL,
  precio_compra_dolar float NOT NULL default 0,--
  igv float NOT NULL default 0,--
  precio_compra_dolar_igv float NOT NULL default 0,--
  precio_compra_soles float NOT NULL default 0,--
  ganancia float NOT NULL default 0,--
  precio_venta float NOT NULL default 0,---
  codfabricante varchar(100) unique,--
  url_pro varchar(500),--
  url_fab varchar(500),--
  promocion varchar(10),--
  precio_promocompra_dolar float NOT NULL default 0,--
  igvpromo float NOT NULL default 0,--
  precio_promocompra_dolar_igv float NOT NULL default 0,--
  precio_promocompra_soles float NOT NULL default 0,--
  ganancia_promo float NOT NULL default 0,--
  precio_promoventa float NOT NULL default 0,---
  fechafinpromo timestamp default '0001-01-01',--
  garantia varchar(100) DEFAULT NULL,--
  stock int NOT NULL default 0,
  estado varchar(10) NOT NULL default 'A',
  fecha timestamp  DEFAULT CURRENT_TIMESTAMP ,
  ventas int not null default 0,
  imagenCom varchar(50) DEFAULT NULL,
  url_imagenCom varchar(500) DEFAULT NULL,--
  userEdit bigint not NULL,
  unidad varchar not NULL default 'PRODUCTO',
  FechaEditado timestamp  DEFAULT CURRENT_TIMESTAMP ,
  marca varchar(10),
  CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  CONSTRAINT subcategoria_id FOREIGN KEY (subcategoria_id) REFERENCES subcategoria(id)
) 
insert into componentes values(
  DEFAULT,
  2,
  1,
  '1',
  'laptop gaming',
  'laptop',
  null,
  200,
  36,
  236,
  903,
  300,
  1103,
  null,
  null,
  null,
  'si',
  4,
  4,
  189,
   4,
  4,
  189,
  default,
  null,
  4,
  DEFAULT,
  DEFAULT
  ,default,
  null,
  null,
  1,
  default,
  default,
  null);



CREATE TABLE especificaciones (
    id bigint NOT NULL primary key GENERATED ALWAYS AS IDENTITY,
    title varchar(50) not null 
 )

insert into especificaciones values(default,'resolucion')
insert into especificaciones values(default,'Procesador')
insert into especificaciones values(default,'memoria ram')
insert into especificaciones values(default,'almacenamiento')

 CREATE TABLE comp_espec(
    id bigint NOT NULL primary key GENERATED ALWAYS AS IDENTITY,
    id_espec bigint NOT NULL, 
    componente_id bigint NOT NULL, 
    nombre varchar(100) not null,
    --url varchar(50),
    CONSTRAINT componente_id FOREIGN KEY (componente_id) REFERENCES componentes(id),
    CONSTRAINT id_espec FOREIGN KEY (id_espec) REFERENCES especificaciones(id)
 )
insert into comp_espec values(default,1,3,'14 pulgadas full HD')
insert into comp_espec values(default,2,3,'core i5');
insert into comp_espec values(default,3,3,'16 gb');
insert into comp_espec values(default,4,3,'1 tera');

CREATE TABLE detalledoc_temporal (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  cod_pro int NOT NULL,
  nombrePro varchar(255) NOT NULL,
  cantidad int NOT NULL,
  precio_unitario int NOT NULL,
  descuento_unitario int NOT NULL,
  importe int NOT NULL,
  usuario_id bigint NOT NULL
) 
CREATE TABLE caja (
  id bigint NOT NULL primary key GENERATED ALWAYS AS IDENTITY,
  USUARIO_ID bigint NOT NULL,
  TIPO varchar(20) NOT NULL default 'ABIERTA',
  FECHA_APERTURA timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  MONTO_APERTURA decimal(9,2) NOT NULL,
  FECHA_CIERRE timestamp NOT NULL,
  MONTO_CIERRE decimal(9,2) NOT NULL,
  MONTO_CIERRE_REAL decimal(9,2) NOT NULL,
  ESTADO varchar(10) NOT NULL,
  CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario(id)
) 

CREATE TABLE persona (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  usuario_id bigint NOT NULL,
  tipo_persona varchar(50) NOT NULL,
  nombre varchar(20) NOT NULL,
  ap_paterno varchar(20) NOT NULL,
  ap_materno varchar(20) NOT NULL,
  DNI_RUC varchar(100) NOT NULL unique,
  departamento varchar(70) NOT NULL,
  provincia varchar(70) NOT NULL,
  distrito varchar(70) NOT NULL,
  direccion varchar(70) NOT NULL,
  correo varchar(70) NOT NULL not null,
  pass varchar(20) NOT NULL not null,
  telefono varchar(50) NOT NULL,
  CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario(id)
) 
CREATE TABLE documento (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  persona_id bigint NOT NULL,
  usuario_id bigint NOT NULL,
  caja_id bigint NOT NULL,
  tipo_documento varchar(20) NOT NULL,
  serie varchar(100) NOT NULL,
  nro_documento varchar(20) NOT NULL,
  fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  sub_total decimal(9,2) NOT NULL,
  descuento_total decimal(9,2) NOT NULL,
  igv decimal(9,2) NOT NULL,
  total_pagar decimal(9,2) NOT NULL,
  estado varchar(50) NOT NULL default 'PENDIENTE',
  tipo_compra_venta varchar(20) NOT NULL,
  CONSTRAINT persona_id FOREIGN KEY (persona_id) REFERENCES persona(id),
  CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  CONSTRAINT caja_id FOREIGN KEY (caja_id) REFERENCES caja(ID)
)
select*from documento

SELECT d.id as iddoc,p.id as idpersona,d.estado as estadodoc,concat(p.nombre,' ',p.ap_paterno,' ',p.ap_materno) as nombre_apellidos,
concat(d.serie,' ',d.nro_documento) as nro_document,d.nro_documento as numerodoc,
d.tipo_documento,TO_CHAR(d.fecha, 'DD-MM-YYYY') as fecha, d.sub_total,d.igv,d.descuento_total,
d.total_pagar,d.estado,d.tipo_compra_venta,p.dni_ruc,d.usuario_id FROM documento d 
join persona p on p.id=d.persona_id where d.tipo_compra_venta='VENTA'

CREATE TABLE detalle_documento (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  documento_id bigint NOT NULL,
  componente_id bigint NOT NULL,
  cantidad int NOT NULL,
  precio_unid decimal(9,2) NOT NULL,
  descuento_unitario decimal(9,2) NOT NULL,
  importe decimal(9,2) NOT NULL,
  CONSTRAINT documento_id FOREIGN KEY (documento_id) REFERENCES documento(id),
  CONSTRAINT componente_id FOREIGN KEY (componente_id) REFERENCES componentes(id)
)

CREATE TABLE img_componentes (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  componente_id bigint NOT NULL,
  nombre varchar(255) not NULL,
  estado varchar(10) not NULL,
  url varchar(500) not null,
  CONSTRAINT componente_id FOREIGN KEY (componente_id) REFERENCES componentes(id)
) 

CREATE TABLE movimiento (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  DOCUMENTO_ID bigint NOT NULL,
  usuario_id int NOT NULL,
  caja_id bigint NOT NULL,
  FECHA timestamp NOT NULL default CURRENT_TIMESTAMP,
  TIPO varchar(8) NOT NULL,
  FORMA_PAGO varchar(20) NOT NULL,
  NRO_OPERACION varchar(100) NOT NULL,
  PAGO_CON decimal(9,2) NOT NULL,
  MONTO_APAGAR decimal(9,2) NOT NULL,
  VUELTO decimal(9,2) NOT NULL,
  OBSERVACION varchar(100),
  ESTADO varchar(10) NOT NULL,
  TIPO_COMPRA_VENTA varchar(10) NOT NULL,
  CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  CONSTRAINT documento_id FOREIGN KEY (documento_id) REFERENCES documento(id),
  CONSTRAINT caja_id FOREIGN KEY (caja_id) REFERENCES caja(id)
) 


CREATE TABLE pedidos (
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  persona_id bigint NOT NULL,
  fecha timestamp NOT NULL default CURRENT_TIMESTAMP ,
  total int NOT NULL,
  estado varchar not null default 'espera',
  CONSTRAINT persona_id FOREIGN KEY (persona_id) REFERENCES persona(id)
)
CREATE TABLE deposito_pedido(
  id bigint NOT NULL primary key GENERATED ALWAYS AS IDENTITY,
  id_pedido bigint NOT NULL,
  nro_operacion int not null ,
  metodo_pago varchar (50) ,
  monto_deposito int NOT NULL,
  estado varchar not null default 'espera',
  fecha_deposito timestamp NOT NULL,
  CONSTRAINT id_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id)
) 


CREATE TABLE pedido_detalle (
  id bigint NOT NULL primary key GENERATED ALWAYS AS IDENTITY,
  pedido_id bigint NOT NULL, 
  producto_id bigint NOT NULL,
  cantidad int not null,
  precio_unitario int not null,
  subtotal int not null,
  CONSTRAINT producto_id FOREIGN KEY (producto_id) REFERENCES componentes(id),
  CONSTRAINT pedido_id FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);
create table moneda(
  id bigint NOT NULL  primary key GENERATED ALWAYS AS IDENTITY,
  nombre varchar(10) not null,
  valor float not null
)
insert into moneda values(default,'dolar',3.97)

select*from categoria
select*from usuario
select*from subcategoria
select*from img_componentes
select*from componentes
select*from moneda
select*from especificaciones
select*from comp_espec

select c.id as idcom ,c.nombre,ce.id as idcomesp,ce.nombre,es.id as idespc,es.title from componentes c join comp_espec ce on c.id=ce.componente_id join especificaciones es on ce.id_espec=es.id where c.id=3

select c.id as idcom ,c.nombre,ce.id as idcomesp,ce.nombre,es.id as idespc,es.title from componentes c join comp_espec ce on c.id=ce.componente_id join especificaciones es on ce.id_espec=es.id where c.id=3





