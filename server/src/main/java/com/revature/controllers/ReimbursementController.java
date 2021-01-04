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
import com.revature.models.ObjectMapperSucks;


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
	
	
	public void GetAllReimbursements(HttpServletRequest req, HttpServletResponse res) throws JsonParseException, JsonMappingException, IOException {
		PrintWriter writer = res.getWriter();
		try {			
			ReimbursementServices rs = new ReimbursementServices(null);
			
			List<Reimbursement> reimbursements = rs.GetAllReimbursements();
			res.setStatus(200);
			writer.write(om.writeValueAsString(reimbursements));
		} 
		catch(Exception e) {
			res.setStatus(404);
			writer.write(e.getMessage());
		}
		
	}
	
	
	public void CreateNewReimbursement (HttpServletRequest req, HttpServletResponse res) throws JsonParseException, JsonMappingException, IOException, NullPointerException, NumberFormatException {
		PrintWriter writer = res.getWriter();
		try {
			ObjectMapperSucks oms = om.readValue(req.getInputStream(), ObjectMapperSucks.class);
			Reimbursement r = oms.parseToReimbursement();
			
			ReimbursementServices rs = new ReimbursementServices(null);
			 rs.CreateReimbursementRequest(r);
			 res.setStatus(200);
			 writer.write("New reimbursement has been created.");
		
		} catch(Exception e) {
			writer.write(e.getMessage());
		}
	}
	
	public void UpdateReimbursement (HttpServletRequest req, HttpServletResponse res, String reimbursementId) throws JsonParseException, JsonMappingException, IOException, NullPointerException, NumberFormatException {
		PrintWriter writer = res.getWriter();
		try {
			Reimbursement r = om.readValue(req.getInputStream(), Reimbursement.class);
			
			ReimbursementServices rs = new ReimbursementServices(null);
			 rs.UpdateReimbursementRequest(r);
			 res.setStatus(200);
			 writer.write(r.toString());
		
		} catch(Exception e) {
			writer.write(e.getMessage());
		}
	}
	
	public void GetReimbursementById(HttpServletRequest req, HttpServletResponse res, String id) throws JsonParseException, JsonMappingException, IOException, NumberFormatException{
		PrintWriter writer = res.getWriter();
		try {
			ReimbursementServices rs = new ReimbursementServices(null);
			int idNum = Integer.parseInt(id);
			
			Reimbursement r = rs.GetReimbursementById(idNum);
			if (r != null) {
				res.setStatus(200);
				writer.write(om.writeValueAsString(r));
			}
			else {
				res.setStatus(404);
				writer.write("Reimbursement not found.");
			}
		} catch(Exception e) {
			writer.write(e.getMessage());
		}
	}
	
}
