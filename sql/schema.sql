Create Table Boards (
    id Int Primary Key,
    name Varchar(30) Not Null,
    url Varchar(20) Not Null
);

Create Table Posts (
    id Int Primary Key,
    title Varchar(144) Not Null,
    body Varchar(144) Null,
    boardid Int Not Null,
    Foreign Key(boardid) References Boards(id)
);
