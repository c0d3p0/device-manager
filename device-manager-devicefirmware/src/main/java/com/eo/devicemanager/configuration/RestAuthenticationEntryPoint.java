package com.eo.devicemanager.configuration;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.eo.devicemanager.util.HttpUtil;
import com.fasterxml.jackson.databind.ObjectMapper;


@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint
{
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException ex) throws IOException, ServletException
	{
		String url = request.getAttribute("javax.servlet.forward.request_uri").toString();
		String message = "Invalid username or password!";
		String body = HttpUtil.createDefaultRestErrorBody(objectMapper,
				defaultDateFormat, HttpStatus.UNAUTHORIZED, message, url);
		response.getWriter().append(body);
		response.setContentType("application/json");
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	}

	
	@Autowired
	private ObjectMapper objectMapper;

	private DateFormat defaultDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
}
