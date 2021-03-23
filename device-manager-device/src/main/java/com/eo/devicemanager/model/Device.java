package com.eo.devicemanager.model;


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
		if(this == obj)
			return true;
		if(obj == null)
			return false;
		if(getClass() != obj.getClass())
			return false;
		
		Device other = (Device) obj;
		return id == other.getId();
	}

	@Override
	public String toString()
	{
		return "Device [id=" + id + ", name=" + name + ", hardwareVersion="
				+ hardwareVersion + "]";
	}

	
	private String name;
	private String hardwareVersion;
	private Long id;
}
