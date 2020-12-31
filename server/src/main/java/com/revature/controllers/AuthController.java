package com.revature.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.models.Credentials;
import com.revature.models.User;
import com.revature.services.UserServices;

public class AuthController {

	private ObjectMapper om = new ObjectMapper();
	
	private UserServices us = new UserServices(null);
	
	public void userLogin(HttpServletRequest req, HttpServletResponse res) throws JsonParseException, JsonMappingException, IOException {
		Credentials cred = om.readValue(req.getInputStream(), Credentials.class);
		User u = us.Login(cred.getUsername(), cred.getPassword());
		
		HttpSession sess = req.getSession();
		
		if (u != null) {
			sess.setAttribute("User-Role", u.getRoleId());
			res.setStatus(200);
			res.getWriter().write(om.writeValueAsString(u));
		}
		else {
			res.sendError(401, "Invalid Authentication");
//			res.getWriter().write(om.writeValueAsString(u));
		}
	}
	
}
