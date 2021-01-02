package com.revature.controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.services.ReimbursementServices;
import com.revature.services.UserServices;

public class ReimbursementController {

	private ObjectMapper om = new ObjectMapper();
	
	private UserServices us = new UserServices(null);
	
	
	public void GetCurrentUsersReimbursements(HttpServletRequest req, HttpServletResponse res, String[] URI) throws JsonParseException, JsonMappingException, IOException {
		PrintWriter writer = res.getWriter();
		if (URI.length > 2) {
			try {			
				int userId = Integer.parseInt(URI[2]);
				
				User u = us.GetUserById(userId);
				ReimbursementServices rs = new ReimbursementServices(u);
				
				if (u != null) {
					List<Reimbursement> reimbursements = rs.GetReimbursementsByAuthor(userId);
					res.setStatus(200);
					writer.write(om.writeValueAsString(reimbursements));
				}
				else {
					res.setStatus(404);
					writer.write("User not found.");
				}
			} catch(Exception e) {
				writer.write(e.getMessage());
			}
		}
		else {
			res.setStatus(400);
			writer.write("Method not supported.");
		}
	}
	
}
