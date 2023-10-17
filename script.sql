
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

-- Insert data into the factory table
INSERT INTO factory (Name_factory, Adresa, Info) VALUES
    ('Factory A', 'Address A1', 'Info A1'),
    ('Factory B', 'Address B1', 'Info B1'),
    ('Factory C', 'Address C1', 'Info C1');

-- Insert data into the polluter table
INSERT INTO polluter (Name_polluter, GDK, GDK_midle, Dangerous_level) VALUES
    ('Polluter X', 10.5, 8.2, 3),
    ('Polluter Y', 7.8, 6.0, 2),
    ('Polluter Z', 5.5, 4.9, 1);

-- Insert data into the pollution table
INSERT INTO pollution (ID_factory, ID_polluter, Count_pollution, Year_pollution) VALUES
    (1, 1, 100.5, '2022'),
    (1, 2, 75.3, '2022'),
    (2, 1, 90.8, '2022'),
    (2, 2, 60.2, '2022'),
    (3, 3, 50.0, '2022');
SELECT
    f.Name_factory,
    p.Name_polluter,
    po.Count_pollution,
    po.Year_pollution
FROM
    pollution po
INNER JOIN factory f ON po.ID_factory = f.ID
INNER JOIN polluter p ON po.ID_polluter = p.ID;