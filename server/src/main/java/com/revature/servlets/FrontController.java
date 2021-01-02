package com.revature.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.controllers.AuthController;

public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 13455643L;

	private AuthController authController = new AuthController();
	
    protected void directControl(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
    	//be our front controller
    	String URI = req.getRequestURI().substring(req.getContextPath().length(), req.getRequestURI().length());
    	PrintWriter writer = res.getWriter();
    	
    	switch(URI) {
    	case "/login":
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
    	case "/users/":
    		switch (req.getMethod()) {
    		case "GET":
    			res.setStatus(400);
    			writer.write("Method not supported.");
    			break;
    		case "POST":
    			res.setStatus(400);
    			writer.write("Method not supported.");
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
    		res.getWriter().write("No such resource.");
    		break;
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
