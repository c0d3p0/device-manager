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

				antMatchers(HttpMethod.GET, firmwareAll, firmwareById,firmwareByName)
				.permitAll().
				
				antMatchers(HttpMethod.POST, firmware)
				.hasAuthority(Role.ROLE_ADMIN)
				
				.antMatchers(HttpMethod.PATCH, firmwareId)
				.hasAuthority(Role.ROLE_ADMIN)
				
				.antMatchers(HttpMethod.DELETE, firmwareId)
				.hasAuthority(Role.ROLE_ADMIN)
				
				.anyRequest().denyAll();
	}

	
	@Autowired
	private UserPasswordAuthenticationProvider userPasswordAuthenticationProvider;

	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

	private String firmwareAll = "/firmware/all";
	private String firmwareById = "/firmware/by-id/{id}";
	private String firmwareByName = "/firmware/by-name/{name}";
	private String firmware = "/firmware";
	private String firmwareId = "/firmware/{id}";
}
