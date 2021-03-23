package com.eo.devicemanager.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;


@JsonInclude(Include.NON_NULL)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class Device
{
	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getHardwareVersion()
	{
		return hardwareVersion;
	}

	public void setHardwareVersion(String hardwareVersion)
	{
		this.hardwareVersion = hardwareVersion;
	}

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public List<DeviceFirmware> getDeviceFirmwareList()
	{
		return deviceFirmwareList;
	}

	public void setDeviceFirmwareList(List<DeviceFirmware> deviceFirmwareList)
	{
		this.deviceFirmwareList = deviceFirmwareList;
	}

	public Firmware getCurrentFirmware()
	{
		return currentFirmware;
	}

	public void setCurrentFirmware(Firmware currentFirmware)
	{
		this.currentFirmware = currentFirmware;
	}

	@Override
	public int hashCode()
	{
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		
		Device other = (Device) obj;
		return other.getId() == id;
	}

	@Override
	public String toString()
	{
		return "Device [id=" + id + ", name=" + name +
				", hardwareVersion=" + hardwareVersion + "]";
	}

	
	private String name;
	private String hardwareVersion;
	private Long id;
	private List<DeviceFirmware> deviceFirmwareList;
	private Firmware currentFirmware;
}
