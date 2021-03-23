package com.eo.devicemanager.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.eo.devicemanager.util.HttpUtil;


@Service
public class DispatcherService
{
	public DispatcherService()
	{
		createServiceUrlMap();
	}

	public ResponseEntity<String> executeRequest(String serviceName,
			HttpMethod method, HttpServletRequest request)
	{
		String url = serviceUrlMap.get(serviceName);

		if (url != null)
		{
			return dispatch(url + HttpUtil.getURLSuffix(request), method,
					request, String.class);
		}

		throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
				"Couldn't find the service requested!");
	}

	public <T> ResponseEntity<T> dispatch(String url, HttpMethod method,
			HttpServletRequest request, Class<T> responseType)
	{
		return dispatch(url, method, request, responseType, null);
	}

	public <T> ResponseEntity<T> dispatch(String url, HttpMethod method,
			HttpServletRequest request, Class<T> responseType, Object param)
	{
		HttpHeaders headers = HttpUtil.getHeadersFromRequest(request);
		Resource body = HttpUtil.getBodyFromRequest(request);
		return dispatch(url, method, headers, body, responseType, param);
	}

	public <T> ResponseEntity<T> dispatch(String url, HttpMethod method,
			HttpHeaders headers, Resource body, Class<T> responseType,
			Object param)
	{
		HttpEntity<Resource> he = new HttpEntity<>(body, headers);
		return restTemplate.exchange(url, method, he, responseType, param);
	}

	public <T, TB> ResponseEntity<T> dispatch(String url, HttpMethod method,
			HttpHeaders headers, TB body, Class<T> responseType, Object param)
	{
		HttpEntity<TB> he = new HttpEntity<>(body, headers);
		return restTemplate.exchange(url, method, he, responseType, param);
	}
	
	private void createServiceUrlMap()
	{
		serviceUrlMap = new HashMap<>();
		serviceUrlMap.put("device", "http://device-service/device");
		serviceUrlMap.put("firmware", "http://firmware-service/firmware");
		serviceUrlMap.put("device-firmware", "http://device-firmware-service/device-firmware");
	}

	
	@Autowired
	private RestTemplate restTemplate;

	private Map<String, String> serviceUrlMap;
}
