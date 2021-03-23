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

				antMatchers(HttpMethod.GET, deviceAll, deviceById, deviceByName)
				.permitAll().
				
				antMatchers(HttpMethod.POST, device)
				.hasAuthority(Role.ROLE_ADMIN)
				
				.antMatchers(HttpMethod.PATCH, deviceId)
				.hasAuthority(Role.ROLE_ADMIN)
				
				.antMatchers(HttpMethod.DELETE, deviceId)
				.hasAuthority(Role.ROLE_ADMIN)
				
				.anyRequest().denyAll();
	}

	
	@Autowired
	private UserPasswordAuthenticationProvider userPasswordAuthenticationProvider;

	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

	private String deviceAll = "/device/all";
	private String deviceById = "/device/by-id/{id}";
	private String deviceByName = "/device/by-name/{name}";
	private String device = "/device";
	private String deviceId = "/device/{id}";
}
