package com.eo.devicemanager.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import com.eo.devicemanager.authentication.UserPasswordAuthenticationProvider;
import com.eo.devicemanager.model.Role;


@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter
{
	@Override
	protected void configure(HttpSecurity http) throws Exception
	{
		http.csrf().disable().httpBasic().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.exceptionHandling()
				.authenticationEntryPoint(restAuthenticationEntryPoint).and()
				.authenticationProvider(userPasswordAuthenticationProvider)
				.authorizeRequests().

				antMatchers(HttpMethod.GET, dfAll, dfById, dfByDeviceId, dfLatestByDeviceId)
				.permitAll().
				
				antMatchers(HttpMethod.POST, deviceFirmware)
				.hasAuthority(Role.ROLE_ADMIN).
				
				antMatchers(HttpMethod.DELETE, deviceFirmwareId, dfByDeviceId, dfByFirmwareId)
				.hasAuthority(Role.ROLE_ADMIN)
				
				.anyRequest().denyAll();
	}

	
	@Autowired
	private UserPasswordAuthenticationProvider userPasswordAuthenticationProvider;

	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

	private String dfAll = "/device-firmware/all";
	private String dfById = "/device-firmware/by-id/{id}";
	private String dfByDeviceId = "/device-firmware/by-device-id/{deviceId}";
	private String dfByFirmwareId = "/device-firmware/by-firmware-id/{firmwareId}";
	private String dfLatestByDeviceId = "/device-firmware/latest-by-device-id/{deviceId}";
	private String deviceFirmware = "/device-firmware";
	private String deviceFirmwareId = "/device-firmware/{id}";
}
