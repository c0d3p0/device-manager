package com.eo.devicemanager.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eo.devicemanager.service.DispatcherService;


@RestController
@RequestMapping("/balanced")
public class DispatcherController
{
	@GetMapping("/{serviceName}/**")
	public ResponseEntity<String> dispatchGet(
			@PathVariable String serviceName, HttpServletRequest request)
	{
		return dispatcherService.executeRequest(serviceName, HttpMethod.GET, request);
	}

	@PostMapping("/{serviceName}/**")
	public ResponseEntity<String> dispatchPost(
			@PathVariable String serviceName, HttpServletRequest request)
	{
		return dispatcherService.executeRequest(serviceName, HttpMethod.POST,
				request);
	}

	@PutMapping("/{serviceName}/**")
	public ResponseEntity<String> dispatchPut(
			@PathVariable String serviceName, HttpServletRequest request)
	{
		return dispatcherService.executeRequest(serviceName, HttpMethod.PUT, request);
	}

	@PatchMapping("/{serviceName}/**")
	public ResponseEntity<String> dispatchPatch(
			@PathVariable String serviceName, HttpServletRequest request)
	{
		return dispatcherService.executeRequest(serviceName, HttpMethod.PATCH, request);
	}

	@DeleteMapping("/{serviceName}/**")
	public ResponseEntity<String> dispatchDelete(
			@PathVariable String serviceName, HttpServletRequest request)
	{
		return dispatcherService.executeRequest(serviceName, HttpMethod.DELETE, request);
	}

	
	@Autowired
	private DispatcherService dispatcherService;
}
