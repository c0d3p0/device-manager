CREATE SEQUENCE Seq_Firmware;
CREATE TABLE Firmware
(
	id IDENTITY NOT NULL PRIMARY KEY,
	name VARCHAR,
	data VARCHAR
);


INSERT INTO Firmware (name, data) VALUES ('firmware_stock_A', 'R29vZCB5b3Uga25vdyBob3cgdG8gZGVjb2RlIGJhc2UgNjQgOi0pLg==');
INSERT INTO Firmware (name, data) VALUES ('firmware_upgrade_A_1', 'WWV0IGFnYWluIGEgYmFzZSA2NCBlbmNvZGVkIHRleHQu');
INSERT INTO Firmware (name, data) VALUES ('firmware_stock_B', 'TW9yZSBiYXNlIDY0IHRvIGRlY29kZSwga2VlcCBnb2luZy4=');
INSERT INTO Firmware (name, data) VALUES ('firmware_upgrade_B_1', 'SG9wZSB5b3UncmUgZW5qb3lpbmcgYWxsIHRoZXNlIGJhc2UgNjQu');
