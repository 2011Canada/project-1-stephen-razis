package com.revature.exceptions;

public class IncorrectPasswordException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public IncorrectPasswordException() {
		super("Wrong ID or password.");
	}
}
