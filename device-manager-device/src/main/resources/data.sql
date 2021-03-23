CREATE TABLE Device
(
	id IDENTITY NOT NULL PRIMARY KEY,
	name VARCHAR,
	hardware_version VARCHAR
);


INSERT INTO Device (name, hardware_version) VALUES ('device_1', 'hardware-model-abc');
INSERT INTO Device (name, hardware_version) VALUES ('device_2', 'hardware-model-abc');
INSERT INTO Device (name, hardware_version) VALUES ('device_3', 'hardware-model-abc');
INSERT INTO Device (name, hardware_version) VALUES ('device_4', 'hardware-model-def');
INSERT INTO Device (name, hardware_version) VALUES ('device_5', 'hardware-model-def');
INSERT INTO Device (name, hardware_version) VALUES ('device_6', 'hardware-model-def');
INSERT INTO Device (name, hardware_version) VALUES ('device_7', 'hardware-model-ghi');
INSERT INTO Device (name, hardware_version) VALUES ('device_8', 'hardware-model-ghi');
INSERT INTO Device (name, hardware_version) VALUES ('device_9', 'hardware-model-ghi');
INSERT INTO Device (name, hardware_version) VALUES ('device_10', 'hardware-model-xyz');