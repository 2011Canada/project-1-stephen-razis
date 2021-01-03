package com.revature.models;

import java.sql.Timestamp;

public class ObjectMapperSucks {

	private String id;
	private String amount;
	private String submitted;
	private String description;
	private String authorId;
	private String typeId;

	public ObjectMapperSucks() {
		super();
	}

	public ObjectMapperSucks(String id, String amount, String submitted, String description, String authorId, String typeId) {
		super();
		this.id = id;
		this.amount = amount;
		this.submitted = submitted;
		this.description = description;
		this.authorId = authorId;
		this.typeId = typeId;
	}
	
	public Reimbursement parseToReimbursement() throws NullPointerException, NumberFormatException {
		int id = Integer.parseInt(this.id);
		double amount = Double.parseDouble(this.amount);
		int authId = Integer.parseInt(this.authorId);
		int typeId = Integer.parseInt(this.typeId);
		
		Reimbursement r = new Reimbursement(id, amount, this.submitted, this.description, authId, typeId);
		
		return r;
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getSubmitted() {
		return submitted;
	}

	public void setSubmitted(String submitted) {
		this.submitted = submitted;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAuthorId() {
		return authorId;
	}

	public void setAuthorId(String authorId) {
		this.authorId = authorId;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((amount == null) ? 0 : amount.hashCode());
		result = prime * result + ((authorId == null) ? 0 : authorId.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((submitted == null) ? 0 : submitted.hashCode());
		result = prime * result + ((typeId == null) ? 0 : typeId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ObjectMapperSucks other = (ObjectMapperSucks) obj;
		if (amount == null) {
			if (other.amount != null)
				return false;
		} else if (!amount.equals(other.amount))
			return false;
		if (authorId == null) {
			if (other.authorId != null)
				return false;
		} else if (!authorId.equals(other.authorId))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (submitted == null) {
			if (other.submitted != null)
				return false;
		} else if (!submitted.equals(other.submitted))
			return false;
		if (typeId == null) {
			if (other.typeId != null)
				return false;
		} else if (!typeId.equals(other.typeId))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ObjectMapperSucks [id=" + id + ", amount=" + amount + ", submitted=" + submitted + ", description="
				+ description + ", authorId=" + authorId + ", typeId=" + typeId + "]";
	}


	

	
	
}
