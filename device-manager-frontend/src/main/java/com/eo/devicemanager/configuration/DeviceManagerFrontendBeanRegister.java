package com.eo.devicemanager.configuration;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import com.eo.devicemanager.error.RestResponseErrorHandler;


@Configuration
public class DeviceManagerFrontendBeanRegister
{
	@Bean
	@LoadBalanced
	public RestTemplate restTemplate()
	{
		RestTemplate rt = new RestTemplate();
		rt.setErrorHandler(new RestResponseErrorHandler());
		rt.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
		return rt;
	}
}
