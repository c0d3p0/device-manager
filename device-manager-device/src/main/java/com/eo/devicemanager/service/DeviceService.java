package com.eo.devicemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eo.devicemanager.model.Device;
import com.eo.devicemanager.repository.DeviceRepository;


@Service
public class DeviceService
{
	public List<Device> findAll()
	{
		return deviceRepository.findAll();
	}

	public Device findById(Long id)
	{
		try
		{
			return deviceRepository.findById(id);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public List<Device> findByName(String name)
	{
		try
		{
			return deviceRepository.findByName(name);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public Device save(Device device)
	{
		try
		{
			return deviceRepository.save(device);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public Device update(Long id, Device device)
	{
		try
		{
			return deviceRepository.update(id, device);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public Device delete(Long id)
	{
		try
		{
			return deviceRepository.delete(id);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}
	

	@Autowired
	private DeviceRepository deviceRepository;
}
