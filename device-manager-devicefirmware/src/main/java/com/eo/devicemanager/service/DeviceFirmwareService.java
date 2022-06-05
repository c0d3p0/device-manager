package com.eo.devicemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eo.devicemanager.model.DeviceFirmware;
import com.eo.devicemanager.repository.DeviceFirmwareRepository;


@Service
public class DeviceFirmwareService
{
	public List<DeviceFirmware> findAll()
	{
		return deviceFirmwareRepository.findAll();
	}

	public DeviceFirmware findById(Long id)
	{
		try
		{
			return deviceFirmwareRepository.findById(id);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public List<DeviceFirmware> findByDeviceId(Long deviceId)
	{
		try
		{
			return deviceFirmwareRepository.findByDeviceId(deviceId);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public DeviceFirmware findLatestByDeviceId(Long deviceId)
	{
		try
		{
			return deviceFirmwareRepository.findLatestByDeviceId(deviceId);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public List<DeviceFirmware> findByFirmwareId(Long firmwareId)
	{
		try
		{
			return deviceFirmwareRepository.findByFirmwareId(firmwareId);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}
	
	public List<DeviceFirmware> save(DeviceFirmware deviceFirmware)
	{
		try
		{
			if(deviceFirmware.getDeviceIds() == null || deviceFirmware.getDeviceIds().length < 1)
			{
				throw new RuntimeException(
						"Field device_ids can't be empty. Pass an array with 1 or more ids!");
			}

			return deviceFirmwareRepository.save(deviceFirmware);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public DeviceFirmware delete(Long id)
	{
		try
		{
			return deviceFirmwareRepository.delete(id);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public List<DeviceFirmware> deleteByDeviceId(Long deviceId)
	{
		try
		{
			return deviceFirmwareRepository.deleteByDeviceId(deviceId);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public List<DeviceFirmware> deleteByFirmwareId(Long firmwareId)
	{
		try
		{
			return deviceFirmwareRepository.deleteByFirmwareId(firmwareId);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	
	@Autowired
	private DeviceFirmwareRepository deviceFirmwareRepository;
}
