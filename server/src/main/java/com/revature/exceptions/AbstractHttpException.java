package com.revature.exceptions;

public abstract class AbstractHttpException extends RuntimeException {
	private int status;
	
	protected AbstractHttpException(String message, int statusCode) {
		super(message);
		this.status = statusCode;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
	
	
}
