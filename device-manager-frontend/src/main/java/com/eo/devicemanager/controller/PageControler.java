package com.eo.devicemanager.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class PageControler implements ErrorController
{
	@GetMapping("/error")
	public String error()
	{
		return "forward:/";
	}
}