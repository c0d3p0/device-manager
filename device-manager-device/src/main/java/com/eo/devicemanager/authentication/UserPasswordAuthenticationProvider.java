package com.eo.devicemanager.authentication;

import java.util.Arrays;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.eo.devicemanager.model.Role;


@Component
public class UserPasswordAuthenticationProvider implements AuthenticationProvider
{
	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException
	{
		String user = authentication.getName().toLowerCase();
		String password = authentication.getCredentials().toString();

		if (user.equalsIgnoreCase(adminUser) && password.equals(adminPass))
		{
			String[] userLogged = new String[] {user, password};
			return new UsernamePasswordAuthenticationToken(userLogged, password,
					Arrays.asList(new SimpleGrantedAuthority(Role.ROLE_ADMIN)));
		}

		return null;
	}

	@Override
	public boolean supports(Class<?> authentication)
	{
		return (UsernamePasswordAuthenticationToken.class
				.isAssignableFrom(authentication));
	}
	

	private String adminUser = "admin";
	private String adminPass = "admin";
}
