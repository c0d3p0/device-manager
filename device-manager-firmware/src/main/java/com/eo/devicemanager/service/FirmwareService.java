package com.eo.devicemanager.service;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import com.eo.devicemanager.model.FileResource;
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

	public FileResource getAsFileResource(Long id)
	{
		Firmware firmware = findById(id);
		
		if(firmware != null && firmware.getId() != null)
		{
			byte[] bytes = decodeBase64Data(firmware);
			return new FileResource(firmware.getName(), new ByteArrayResource(bytes));
		}
		
		throw new RuntimeException("Firmware not found in the system!");
	}
	
	public byte[] decodeBase64Data(Long id)
	{
		Firmware firmware = findById(id);
		return Base64.getDecoder().decode(firmware.getData());
	}

	public byte[] decodeBase64Data(Firmware firmware)
	{
		return Base64.getDecoder().decode(firmware.getData());
	}


	@Autowired
	private FirmwareRepository firmwareRepository;
}
