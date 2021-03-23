CREATE TABLE DeviceFirmware
(
	id IDENTITY NOT NULL PRIMARY KEY,
	device_id BIGINT,
	firmware_id BIGINT,
	association_time datetime default CURRENT_TIMESTAMP
);

INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (1, 1);
INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (1, 2);

INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (2, 3);
INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (2, 4);

INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (3, 4);

INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (4, 1);

INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (5, 2);

INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (6, 3);

INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (7, 4);
INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (7, 3);

INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (8, 2);
INSERT INTO DeviceFirmware (device_id, firmware_id) VALUES (8, 2);
