package com.eo.devicemanager.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.eo.devicemanager.model.Firmware;
import com.eo.devicemanager.util.HttpUtil;


@Service
public class FirmwareService
{
	public Firmware delete(Long id, HttpServletRequest request)
	{
		HttpHeaders headers = HttpUtil.getHeadersFromRequest(request);
		dispatchService.dispatch(deviceFirmwareDeviceIdUrl, HttpMethod.DELETE,
				headers, null, String.class, id);
		return dispatchService.dispatch(firmwareIdUrl, HttpMethod.DELETE,
				headers, null, Firmware.class, id).getBody();
	}

	
	@Autowired
	private DispatcherService dispatchService;

	private String deviceFirmwareDeviceIdUrl = "http://device-firmware-service/device-firmware/by-firmware-id/{firmwareId}";
	private String firmwareIdUrl = "http://firmware-service/firmware/{id}";
}
