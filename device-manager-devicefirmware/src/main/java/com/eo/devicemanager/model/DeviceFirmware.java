package com.eo.devicemanager.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;


public class DeviceFirmware
{
	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public Long getDeviceId()
	{
		return deviceId;
	}

	public void setDeviceId(Long deviceId)
	{
		this.deviceId = deviceId;
	}

	public Long getFirmwareId()
	{
		return firmwareId;
	}

	public void setFirmwareId(Long firmwareId)
	{
		this.firmwareId = firmwareId;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getAssociationTime()
	{
		return associationTime;
	}

	public void setAssociationTime(Date associationTime)
	{
		this.associationTime = associationTime;
	}

	public long[] getDeviceIds()
	{
		return deviceIds;
	}

	public void setDeviceIds(long[] deviceIds)
	{
		this.deviceIds = deviceIds;
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
		
		DeviceFirmware other = (DeviceFirmware) obj;
		return other.getId() == id;
	}

	@Override
	public String toString()
	{
		return "DeviceFirmware [id=" + id + ", deviceId=" + deviceId
				+ ", firmwareId=" + firmwareId + ", associationTime="
				+ associationTime + "]";
	}

	private Long id;
	private Long deviceId;
	private Long firmwareId;
	private long[] deviceIds;
	private Date associationTime;
}
