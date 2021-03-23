package com.eo.devicemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;


@SpringBootApplication
@EnableEurekaServer
public class DeviceManagerEurekaServerApplication
{
	public static void main(String[] args)
	{
		SpringApplication.run(DeviceManagerEurekaServerApplication.class,
				args);
	}
}
