use stock_prediction;
CREATE TABLE users(
	userid int not null primary key auto_increment,
    username varchar(20) not null,
    password varchar(30) not null,
    email varchar(50) not null unique key,
    fullname varchar(30) not null ,
    type varchar(15) not null,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE stocklist(
	stockid int not null primary key auto_increment ,
    symboy varchar(10) not null unique key,
    company_name varchar(30) not null ,
    company_detail varchar(200) not null,
    previous_close_price double not null,
    total int not null
);

CREATE TABLE comments(
commentid int not null primary key auto_increment,
userid int not null ,
stockid int not null,
comment_text varchar(200),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
foreign key (userid) references users(userid),
foreign key (stockid) references stocklist(stockid)
);
CREATE TABLE StockFollow (
followid int not null primary key  auto_increment ,
userid int not null,
stockid int not null ,
foreign key (userid) references users(userid),
foreign key (stockid) references stocklist(stockid)

);
CREATE TABLE stockhistory(
id int not null primary key auto_increment,
stockid int not null  ,
date datetime not null ,
open double not null,
high double not null,
low double not null,
close double not null,
vollumn double not null,
foreign key (stockid) references stocklist(stockid)
);
CREATE TABLE stockprediction(
predictionid int not null  primary key auto_increment,
stockid int not null ,
userid int not null,
date datetime not null ,
text_prediction varchar(300) not null,
foreign key (userid) references users(userid),
foreign key (stockid) references stocklist(stockid)
)