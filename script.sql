
CREATE database eco;
CREATE TABLE factory (
 ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
 Name_factory VARCHAR(20) NOT NULL,
 Adresa VARCHAR(255) NOT NULL,
 Info VARCHAR(255) NOT NULL );


CREATE TABLE polluter (
 ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
 Name_polluter VARCHAR(50) NOT NULL,
 GDK DOUBLE NOT NULL,
 GDK_midle DOUBLE NOT NULL,
 Dangerous_level INT NOT NULL);


CREATE TABLE pollution (
    ID_factory INT NOT NULL,
    ID_polluter INT NOT NULL,
    Count_pollution DOUBLE NOT NULL,
    Year_pollution YEAR NOT NULL,
    FOREIGN KEY (ID_factory) REFERENCES factory(ID),
    FOREIGN KEY (ID_polluter) REFERENCES polluter(ID)
);
