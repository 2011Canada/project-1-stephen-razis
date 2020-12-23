package com.revature.exceptions;

public class MalformedPasswordException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public MalformedPasswordException( ) {
		super("Malformed password construction.");
	}
	
}
