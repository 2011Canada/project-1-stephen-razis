package com.revature.exceptions;

public class TooManyFailedLoginsException extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public TooManyFailedLoginsException() {
		super("Too many failed login attempts.");
	}

}
