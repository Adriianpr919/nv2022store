-- creamos la base de datos
create database nvstore2022;

-- usamos la base de datos
use nvstore2022;

-- creamos las tablas
-- Tabla users
create table users(
idUsers int8 not null primary key,
name varchar(80) not null,
email varchar(90) not null,
password varchar(50) not null,
isAdmin varchar(50) not null
);

-- Tabla products
create table products(
idProducts int8 not null primary key,
name varchar(80) not null,
slug varchar(80) not null,
idcategory int8 not null unique key,
category varchar(80) not null,
idsizes int8 not null unique key,
sizes varchar(5) not null,
idcolorsOne int8 not null unique key,
colorsOne varchar(50) not null,
idcolorsTwo int8 not null unique key,
colorsTwo varchar(50) not null,
idImage int8 not null unique key,
image varchar(90) not null,
imageOne varchar(90) not null,
imageTwo varchar(90) not null,
imageThree varchar(90) not null,
imageFour varchar(90) not null,
imageFive varchar(90) not null,
imageSix varchar(90) not null,
imageSeven varchar(90) not null,
idprice int8 not null unique key,
price double(11,2) not null,
brand varchar(15) not null,
countInStock double(11,2) not null,
description varchar(900) not null
);

-- Tabla price 
create table price(
idprice int8 not null primary key,
price double(11,2) not null
);

-- Tabla size
create table sizes(
idsizes int8 not null primary key,
sizes varchar(5) not null
);

-- Tabla colorsOne
create table colorsOne(
idcolorsOne int8 not null primary key,
colorsOne varchar(50) not null
);

-- Tabla colorsTwo
create table colorsTwo(
idcolorsTwo int8 not null primary key,
colorsTwo varchar(50) not null
);

-- Tabla category
create table category(
idcategory int8 not null primary key,
category varchar(80) not null,
brand varchar(15) not null
);

-- Tabla productsImage
create table productsImage(
idImage int8 not null primary key,
image varchar(90) not null,
imageOne varchar(90) not null,
imageTwo varchar(90) not null,
imageThree varchar(90) not null,
imageFour varchar(90) not null,
imageFive varchar(90) not null,
imageSix varchar(90) not null,
imageSeven varchar(90) not null
);

-- Tabla orders
create table orders(
idOrders int8 not null primary key,
idUsers int8 not null unique key,
idorderItems int8 not null unique key,
idshippingAddress int8 not null unique key,
paymentMethod varchar(50) not null,
itemsPrice double(11,2) not null,
shippingPrice double(11,2) not null,
taxPrice double(11,2) not null,
totalPrice double(11,2) not null,
isPaid varchar(15) not null,
isDelivered varchar(15) not null
);

-- Table orderItems
create table orderItems(
idorderItems int8 not null primary key,
idProducts int8 not null unique key,
name varchar(80) not null,
quantity double(11,2) not null,
idsizes int8 not null unique key,
sizes varchar(5) not null,
idcolorsOne int8 not null unique key,
colorsOne varchar(50) not null,
idcolorsTwo int8 not null unique key,
colorsTwo varchar(50) not null,
idImage int8 not null unique key,
image varchar(90) not null,
idprice int8 not null unique key,
price double(11,2) not null
);

-- Table shippingAddress
create table shippingAddress(
idshippingAddress int8 not null primary key,
fullName varchar(80) not null,
address varchar(80) not null,
city varchar(80) not null,
postalCode double(11,2) not null,
country varchar(80) not null
);

-- Table ordersProducts
create table ordersProducts(
idordersProducts int8 not null primary key,
idProducts int8 not null unique key,
idOrders int8 not null unique key
);

-- creamos la relación entre idcategory, idsizes, idcolorsOne, idcolorsTwo, idImage, idprice, idordersProducts, idProducts, idOrders, idshippingAddress y idorderItems
alter table ordersProducts add constraint fk_products_client
foreign key(idProducts)
references products(idProducts) on delete no action on update no action;

alter table ordersProducts add constraint fk_orders_client
foreign key(idOrders)
references orders(idOrders) on delete no action on update no action;

alter table products add constraint fk_category_client
foreign key(idcategory)
references category(idcategory) on delete no action on update no action;

alter table products add constraint fk_sizes_client
foreign key(idsizes)
references sizes(idsizes) on delete no action on update no action;

alter table products add constraint fk_colorsOne_client
foreign key(idcolorsOne)
references colorsOne(idcolorsOne) on delete no action on update no action;

alter table products add constraint fk_colorsTwo_client
foreign key(idcolorsTwo)
references colorsTwo(idcolorsTwo) on delete no action on update no action;

alter table products add constraint fk_productsImage_client
foreign key(idImage)
references productsImage(idImage) on delete no action on update no action;

alter table products add constraint fk_price_client
foreign key(idprice)
references price(idprice) on delete no action on update no action;

alter table orders add constraint fk_users_client
foreign key(idUsers)
references users(idUsers) on delete no action on update no action;

alter table orders add constraint fk_orderItems_client
foreign key(idorderItems)
references orderItems(idorderItems) on delete no action on update no action;

alter table orders add constraint fk_shippingAddress_client
foreign key(idshippingAddress)
references shippingAddress(idshippingAddress) on delete no action on update no action;

alter table orderItems add constraint fk_products_client
foreign key(idProducts)
references products(idProducts) on delete no action on update no action;

alter table orderItems add constraint fk_sizes_client
foreign key(idsizes)
references sizes(idsizes) on delete no action on update no action;

alter table orderItems add constraint fk__colorsOne_client
foreign key(idcolorsOne)
references colorsOne(idcolorsOne) on delete no action on update no action;

alter table orderItems add constraint fk_colorsTwo_client
foreign key(idcolorsTwo)
references colorsTwo(idcolorsTwo) on delete no action on update no action;

alter table orderItems add constraint fk_productsImage_client
foreign key(idImage)
references productsImage(idImage) on delete no action on update no action;

alter table orderItems add constraint fk_price_client
foreign key(idprice)
references price(idprice) on delete no action on update no action;
