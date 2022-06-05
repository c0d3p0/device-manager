package com.eo.devicemanager.model;

import org.springframework.core.io.Resource;


public class FileResource
{
	public FileResource() {}

	public FileResource(String name, Resource resource)
	{
		this.name = name;
		this.resource = resource;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public Resource getResource()
	{
		return resource;
	}

	public void setResource(Resource resource)
	{
		this.resource = resource;
	}

	@Override
	public int hashCode()
	{
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	
	private String name;
	private Resource resource;
}
