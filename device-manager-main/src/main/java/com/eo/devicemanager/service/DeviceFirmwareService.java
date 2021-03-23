package com.eo.devicemanager.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.eo.devicemanager.model.Device;
import com.eo.devicemanager.model.DeviceFirmware;
import com.eo.devicemanager.model.Firmware;
import com.eo.devicemanager.util.HttpUtil;


@Service
public class DeviceFirmwareService
{
	public DeviceFirmware save(DeviceFirmware deviceFirmware,
			HttpServletRequest request)
	{
		if(deviceFirmware.getDeviceIds() == null ||
				deviceFirmware.getDeviceIds().length < 1)
		{
			throw new RuntimeException(
					"Field device_ids can't be empty. Pass an array with 1 or more valid ids!");
		}

		Firmware firmware = restTemplate.getForObject(firmwareIdUrl,
				Firmware.class, deviceFirmware.getFirmwareId());

		if(firmware.getId() != deviceFirmware.getFirmwareId())
		{
			throw new RuntimeException("The system doesn't have the firmware_id "
					+ deviceFirmware.getFirmwareId());
		}

		for(Long deviceId : deviceFirmware.getDeviceIds())
		{
			Device device = restTemplate.getForObject(deviceByIdUrl, Device.class, deviceId);

			if (device.getId() != deviceId)
			{
				throw new RuntimeException(
						"The system doesn't have the device_id " + deviceId);
			}
		}

		HttpEntity<DeviceFirmware> he = new HttpEntity<>(deviceFirmware,
				HttpUtil.getHeadersFromRequest(request));
		return restTemplate.exchange(deviceFirmwareUrl, HttpMethod.POST, he,
				DeviceFirmware.class).getBody();
	}

	
	@Autowired
	private RestTemplate restTemplate;

	private String deviceByIdUrl = "http://device-service/device/by-id/{id}";
	private String firmwareIdUrl = "http://firmware-service/firmware/by-id/{id}";
	private String deviceFirmwareUrl = "http://device-firmware-service/device-firmware";
}
