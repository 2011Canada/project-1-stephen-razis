package com.revature.models;

public class Reimbursement {
    private int id;
    private double amount;
    private String submitted; //may need a datetime object
    private String resolved; //may need a datetime object
    private String description;
    private Byte[] receipt;
    private int authorId;
    private int resolverId;
    private int statusId;   //may want to make this an enum
    private int typeId;     //may want to make this an enum

    //default, not resolved and no description
    //if new reimbursement, set the id to 0
    public Reimbursement(int id, int amount, String submitted, int authorId, int typeId) {
        this.id = id;
        this.amount = amount;
        this.submitted = submitted;
        this.resolved = "";
        this.description = "";
        this.authorId = authorId;
        this.resolverId = 0;
        this.statusId = 2;
        this.typeId = typeId;
    }

    //description   
    public Reimbursement(int id, int amount, String submitted, String resolved, String description, int authorId, int typeId, int resolverId, int statusId) {
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

    //resolved   
    public Reimbursement(int id, int amount, String submitted, String resolved, int authorId, int typeId, int resolverId, int statusId) {
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
    public Reimbursement(int id, int amount, String submitted, String resolved, String description, int authorId, int typeId, int resolverId, int statusId) {
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

    public int getId() {
        return this.id;
    }

    public double getAmount() {
        return this.amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getSubmitted() {
        return this.submitted;
    }

    public String getResolved() {
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

    public void setResolverId(int resovlerId) {
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
}
