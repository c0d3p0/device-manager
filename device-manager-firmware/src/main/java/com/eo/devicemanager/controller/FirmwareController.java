package com.eo.devicemanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eo.devicemanager.model.FileResource;
import com.eo.devicemanager.model.Firmware;
import com.eo.devicemanager.service.FirmwareService;


@RestController
@RequestMapping("/firmware")
public class FirmwareController
{
	@GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Firmware> getAll()
	{
		return firmwareService.findAll();
	}

	@GetMapping(path = "/by-id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Firmware getById(@PathVariable Long id)
	{
		return firmwareService.findById(id);
	}

	@GetMapping(path = "/by-name/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Firmware> getByNameWith(@PathVariable String name)
	{
		return firmwareService.findByNameWith(name);
	}

	@GetMapping(path = "/download/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<Resource> download(@PathVariable Long id)
	{
		FileResource fr = firmwareService.getAsFileResource(id);
		String hv = String.format("attachment; filename=\"%s\"", fr.getName());
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
				.header(HttpHeaders.CONTENT_DISPOSITION, hv).body(fr.getResource());
	}

	@PostMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
	public Firmware save(@RequestBody Firmware firmware)
	{
		return firmwareService.save(firmware);
	}

	@PatchMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Firmware update(@PathVariable Long id,
			@RequestBody Firmware firmware)
	{
		return firmwareService.update(id, firmware);
	}

	@DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Firmware delete(@PathVariable Long id)
	{
		return firmwareService.delete(id);
	}

	
	@Autowired
	private FirmwareService firmwareService;
}
