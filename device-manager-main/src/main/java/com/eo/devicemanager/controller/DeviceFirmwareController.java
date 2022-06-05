package com.eo.devicemanager.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
	@PostMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<DeviceFirmware> save(@RequestBody DeviceFirmware deviceFirmware,
			HttpServletRequest request)
	{
		return deviceFirmwareService.save(deviceFirmware, request);
	}

	
	@Autowired
	private DeviceFirmwareService deviceFirmwareService;
}
