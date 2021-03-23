package com.eo.devicemanager.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.eo.devicemanager.model.Device;
import com.eo.devicemanager.model.DeviceFirmware;
import com.eo.devicemanager.model.Firmware;
import com.eo.devicemanager.util.HttpUtil;


@Service
public class DeviceService
{
	public Device findById(Long deviceId)
	{
		Device device = restTemplate.getForObject(deviceByIdUrl, Device.class, deviceId);

		if (device.getId() != null)
		{
			DeviceFirmware deviceFirmware = restTemplate.getForObject(
					deviceFirmwareLatestDeviceIdUrl, DeviceFirmware.class, deviceId);

			if (deviceFirmware.getId() != null)
			{
				Firmware firmware = restTemplate.getForObject(firmwareIdUrl,
						Firmware.class, deviceFirmware.getFirmwareId());
				device.setCurrentFirmware(firmware);
			}
		}

		return device;
	}

	public Device findWithHistoryById(Long deviceId)
	{
		Device device = restTemplate.getForObject(deviceByIdUrl, Device.class,
				deviceId);

		if (device.getId() != null)
		{
			List<DeviceFirmware> dfList = restTemplate.exchange(deviceFirmwareDeviceIdUrl, HttpMethod.GET,
					null, new ParameterizedTypeReference<List<DeviceFirmware>>(){}, deviceId).getBody();

			if (dfList != null)
			{
				for (DeviceFirmware df : dfList)
				{
					Firmware firmware = restTemplate.getForObject(firmwareIdUrl,
							Firmware.class, df.getFirmwareId());
					df.setFirmware(firmware);
				}
			}

			device.setDeviceFirmwareList(dfList);
		}

		return device;
	}

	public Firmware findCurrentFirmwareById(Long deviceId)
	{
		DeviceFirmware deviceFirmware = restTemplate.getForObject(
				deviceFirmwareLatestDeviceIdUrl, DeviceFirmware.class, deviceId);
		return restTemplate.getForObject(firmwareIdUrl, Firmware.class,
				deviceFirmware.getFirmwareId());
	}

	public Device delete(Long id, HttpServletRequest request)
	{
		HttpHeaders headers = HttpUtil.getHeadersFromRequest(request);
		dispatchService.dispatch(deviceFirmwareDeviceIdUrl, HttpMethod.DELETE,
				headers, null, String.class, id);
		return dispatchService.dispatch(deviceIdUrl, HttpMethod.DELETE, headers,
				null, Device.class, id).getBody();
	}

	
	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private DispatcherService dispatchService;

	private String deviceByIdUrl = "http://device-service/device/by-id/{id}";
	private String deviceFirmwareLatestDeviceIdUrl =
			"http://device-firmware-service/device-firmware/latest-by-device-id/{deviceId}";
	private String deviceFirmwareDeviceIdUrl =
			"http://device-firmware-service/device-firmware/by-device-id/{deviceId}";
	private String firmwareIdUrl = "http://firmware-service/firmware/by-id/{id}";
	private String deviceIdUrl = "http://device-service/device/{id}";
}
