package com.eo.devicemanager.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eo.devicemanager.model.Device;
import com.eo.devicemanager.model.Firmware;
import com.eo.devicemanager.service.DeviceService;


@RestController
@RequestMapping("/device")
public class DeviceController
{
	@GetMapping(path = "/by-device-id/{deviceId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Device getById(@PathVariable Long deviceId)
	{
		return deviceService.findById(deviceId);
	}

	@GetMapping(path = "/history-by-device-id/{deviceId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Device getWithHistoryById(@PathVariable Long deviceId)
	{
		return deviceService.findWithHistoryById(deviceId);
	}

	@GetMapping(path = "/download-firmware/{deviceId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<String> downloadFirmware(@PathVariable Long deviceId)
	{
		Firmware firmware = deviceService.findCurrentFirmwareById(deviceId);
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
				.header(HttpHeaders.CONTENT_DISPOSITION,
						"attachment; filename=\"" + firmware.getName() + "\"")
				.body(firmware.getData());
	}
	
	@DeleteMapping(path = "/{deviceId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Device delete(@PathVariable Long deviceId, HttpServletRequest request)
	{
		return deviceService.delete(deviceId, request);
	}
	

	@Autowired
	private DeviceService deviceService;
}
