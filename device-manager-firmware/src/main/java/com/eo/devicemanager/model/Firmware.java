package com.eo.devicemanager.model;


public class Firmware
{
	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getData()
	{
		return data;
	}

	public void setData(String data)
	{
		this.data = data;
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
		
		Firmware other = (Firmware) obj;
		return id == other.getId();
	}

	@Override
	public String toString()
	{
		return "Firmware [id=" + id + ", name=" + name +
				", data=" + data + "]";
	}
	
	
	private Long id;
	private String name;
	private String data;
}
