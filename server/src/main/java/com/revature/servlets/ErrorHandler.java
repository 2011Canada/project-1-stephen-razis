package com.revature.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.exceptions.AbstractHttpException;

public class ErrorHandler extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Throwable t = (Throwable) req.getAttribute("javax.servlet.error.exception");
		
		if (t instanceof AbstractHttpException) {
			AbstractHttpException err = (AbstractHttpException) t;
			
			resp.setStatus(err.getStatus());
			resp.getWriter().write(err.getMessage());
		} 
		else {
			t.printStackTrace();
			resp.setStatus(500);
			resp.getWriter().write("Something went wrong");
		}
		super.doGet(req, resp);
	}
	
	
	
}
