package com.eo.devicemanager.configuration;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;


@Configuration
public class BeanRegister
{
	@LoadBalanced
	@Bean
	public RestTemplate restTemplate()
	{
		return new RestTemplate(new HttpComponentsClientHttpRequestFactory());
	}
}
