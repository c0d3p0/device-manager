package com.eo.devicemanager.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eo.devicemanager.model.Firmware;
import com.eo.devicemanager.service.FirmwareService;


@RestController
@RequestMapping("/firmware")
public class FirmwareController
{
	@DeleteMapping(path = "/{firmwareId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Firmware delete(@PathVariable Long firmwareId, HttpServletRequest request)
	{
		return firmwareService.delete(firmwareId, request);
	}

	
	@Autowired
	private FirmwareService firmwareService;
}
