package com.revature.models;

import java.sql.Timestamp;
import java.util.Arrays;

public class Reimbursement {
    private int id;
    private double amount;
    private Timestamp submitted;
    private Timestamp resolved;
    private String description;
    private Byte[] receipt;
    private int authorId;
    private int resolverId;
    private int statusId;   //may want to make this an enum
    private int typeId;     //may want to make this an enum

    //default, not resolved and no description
    //if new reimbursement, set the id to 0
    public Reimbursement(int id, double amount, Timestamp submitted, int authorId, int typeId) {
        this.id = id;
        this.amount = amount;
        this.submitted = submitted;
        this.resolved = null;
        this.description = "";
        this.authorId = authorId;
        this.resolverId = 0;
        this.statusId = 2;
        this.typeId = typeId;
    }

    //description   
    public Reimbursement(int id, double amount, Timestamp submitted, Timestamp resolved, String description, int authorId, int typeId, int resolverId, int statusId) {
        this.id = id;
        this.amount = amount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.description = description;
        this.authorId = authorId;
        this.resolverId = resolverId;
        this.statusId = statusId;
        this.typeId = typeId;
    }

    //resolved no description
    public Reimbursement(int id, double amount, Timestamp submitted, Timestamp resolved, int authorId, int typeId, int resolverId, int statusId) {
        this.id = id;
        this.amount = amount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.authorId = authorId;
        this.resolverId = resolverId;
        this.statusId = statusId;
        this.typeId = typeId;
    }

    //resolved with description
//    public Reimbursement(int id, double amount, int statusId, String submitted, String resolved, String description, int authorId, int typeId, int resolverId) {
//        this.id = id;
//        this.amount = amount;
//        this.submitted = submitted;
//        this.resolved = resolved;
//        this.description = description;
//        this.authorId = authorId;
//        this.resolverId = resolverId;
//        this.statusId = statusId;
//        this.typeId = typeId;
//    }

    public int getId() {
        return this.id;
    }

    public double getAmount() {
        return this.amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Timestamp getSubmitted() {
        return this.submitted;
    }

    public Timestamp getResolved() {
        return this.resolved;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Byte[] getReceipt() {
        return this.receipt;
    }

    public void setReceipt(Byte[] receipt) {
        this.receipt = receipt;
    }

    public int getAuthorId() {
        return this.authorId;
    }

    public int getResolverId() {
        return this.resolverId;
    }

    public void setResolverId(int resolverId) {
        this.resolverId = resolverId;
    }

    public int getStatusId() {
        return this.statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public int getTypeId() {
        return this.typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

	@Override
	public String toString() {
		return "Reimbursement [id=" + id + ", amount=" + amount + ", submitted=" + submitted + ", resolved=" + resolved
				+ ", description=" + description + ", receipt=" + Arrays.toString(receipt) + ", authorId=" + authorId
				+ ", resolverId=" + resolverId + ", statusId=" + statusId + ", typeId=" + typeId + "]";
	}
    
    
}
