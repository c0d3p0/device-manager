package com.eo.devicemanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eo.devicemanager.model.Firmware;
import com.eo.devicemanager.repository.FirmwareRepository;


@Service
public class FirmwareService
{
	public List<Firmware> findAll()
	{
		return firmwareRepository.findAll();
	}

	public Firmware findById(Long id)
	{
		try
		{
			return firmwareRepository.findById(id);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public List<Firmware> findByName(String name)
	{
		try
		{
			return firmwareRepository.findByName(name);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public Firmware save(Firmware firmware)
	{
		try
		{
			return firmwareRepository.save(firmware);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public Firmware update(Long id, Firmware firmware)
	{
		try
		{
			return firmwareRepository.update(id, firmware);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	public Firmware delete(Long id)
	{
		try
		{
			return firmwareRepository.delete(id);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}

	
	@Autowired
	private FirmwareRepository firmwareRepository;
}
