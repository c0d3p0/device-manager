package com.eo.devicemanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eo.devicemanager.model.DeviceFirmware;
import com.eo.devicemanager.service.DeviceFirmwareService;


@RestController
@RequestMapping("/device-firmware")
public class DeviceFirmwareController
{
	@GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<DeviceFirmware> getAll()
	{
		return deviceFirmwareService.findAll();
	}

	@GetMapping(path = "/by-id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public DeviceFirmware getById(@PathVariable Long id)
	{
		return deviceFirmwareService.findById(id);
	}

	@GetMapping(path = "/by-device-id/{deviceId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<DeviceFirmware> findByDeviceId(@PathVariable Long deviceId)
	{
		return deviceFirmwareService.findByDeviceId(deviceId);
	}

	@GetMapping(path = "/latest-by-device-id/{deviceId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public DeviceFirmware findLatestByDeviceId(@PathVariable Long deviceId)
	{
		return deviceFirmwareService.findLatestByDeviceId(deviceId);
	}

	@PostMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
	public DeviceFirmware save(@RequestBody DeviceFirmware deviceFirmware)
	{
		deviceFirmwareService.save(deviceFirmware);
		return deviceFirmware;
	}

	@DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public DeviceFirmware delete(@PathVariable Long id)
	{
		return deviceFirmwareService.delete(id);
	}

	@DeleteMapping(path = "/by-device-id/{deviceId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<DeviceFirmware> deleteByDeviceId(@PathVariable Long deviceId)
	{
		return deviceFirmwareService.deleteByDeviceId(deviceId);
	}

	@DeleteMapping(path = "/by-firmware-id/{firmwareId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<DeviceFirmware> deleteByFirmwareId(@PathVariable Long firmwareId)
	{
		return deviceFirmwareService.deleteByFirmwareId(firmwareId);
	}
	

	@Autowired
	private DeviceFirmwareService deviceFirmwareService;
}
