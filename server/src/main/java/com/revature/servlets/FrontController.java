package com.revature.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.controllers.AuthController;
import com.revature.controllers.ReimbursementController;
import com.revature.controllers.UserController;

public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 13455643L;

	private AuthController authController = new AuthController();
	private UserController userController = new UserController();
	private ReimbursementController reimbursementController = new ReimbursementController();
	
    protected void directControl(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
    	//be our front controller
    	String URI = req.getRequestURI().substring(req.getContextPath().length(), req.getRequestURI().length());
    	
    	String[] splitURI = URI.split("/");
    	
    	PrintWriter writer = res.getWriter();
    	
    	if (splitURI.length > 1) {
	    	switch(splitURI[1]) {
	    	case "login":
	    		switch (req.getMethod()) {
	    		case "GET":
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		case "POST":
	    			authController.userLogin(req, res);
	    			break;
	    		case "PUT":
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		case "DELETE":
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		default:
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		}
	    		break;
	    	case "users":
	    		switch (req.getMethod()) {
	    		case "GET":
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		case "POST":
	    			reimbursementController.GetCurrentUsersReimbursements(req, res, splitURI);
	    			break;
	    		case "PUT":
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		case "DELETE":
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		default:
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		}
	    		break;	
	    	case "reimbursements":
	    		switch (req.getMethod()) {
	    		case "GET":
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		case "POST":
	    			if (splitURI.length > 2 && splitURI[2].equals("create")) {
	    				reimbursementController.CreateNewReimbursement(req, res);
	    			}
	    			else {
	    				res.setStatus(400);
		    			writer.write("Method not supported.");
	    			}
	    			break;
	    		case "PUT":
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		case "DELETE":
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		default:
	    			res.setStatus(400);
	    			writer.write("Method not supported.");
	    			break;
	    		}
	    		break;
	    	default:
	    		res.setStatus(404);
	    		//FOR TESTING
	    		res.getWriter().write("HIT THE DEFAULT CASE");
	    		break;
	    	}
    	}
    	else {
    		res.setStatus(404);
    		res.getWriter().write("Something went wrong.");
    	}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		directControl(request,response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		directControl(request,response);
	}

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        directControl(request,response);
    }
    
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        directControl(request,response);
    }
}
