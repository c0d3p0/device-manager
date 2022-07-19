package com.eo.devicemanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eo.devicemanager.model.Device;
import com.eo.devicemanager.service.DeviceService;


@RestController
@RequestMapping("/device")
public class DeviceController
{
	@GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Device> getAll()
	{
		return deviceService.findAll();
	}

	@GetMapping(path = "/by-id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Device getById(@PathVariable Long id)
	{
		return deviceService.findById(id);
	}

	@GetMapping(path = "/by-name/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Device> getByNameWith(@PathVariable String name)
	{
		return deviceService.findByNameWith(name);
	}

	@PostMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
	public Device save(@RequestBody Device device)
	{
		return deviceService.save(device);
	}

	@PatchMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Device update(@PathVariable Long id, @RequestBody Device device)
	{
		return deviceService.update(id, device);
	}

	@DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Device delete(@PathVariable Long id)
	{
		return deviceService.delete(id);
	}
	

	@Autowired
	private DeviceService deviceService;
}
