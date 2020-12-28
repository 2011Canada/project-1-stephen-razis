package com.revature.services;

public class ReimbursementServices {
    IReimbursementDAO rd;
    IUserDAO ud;
    User activeUser;

    public ReimbursementServices(User activeUser) {
        rd = new ReimbursementDAOPostgres();
        ud = new UserDAOPostgres();

        this.activeUser = activeUser;
    }

    //TODO
    public List<Reimbursement> GetAllReimbursements() {

    }

    //TODO
    public List<Reimbursement> GetReimbursementsByAuthor(int authorId) {

    }

    //TODO
    public Reimbursement GetReimbursementById(int reimbursementId) {

    }

    //TODO
    public List<Reimbursement> GetReimbursementsByStatus(int statusId) {

    }

    //TODO
    public List<Reimbursement> GetReimbursementsByType(int typeId) {

    }

    //TODO
    public void AcceptReimbursementRequest(Reimbursement r) {

    }

    //TODO
    public void RejectReimbursementRequest(Reimbursement r) {

    }

    //TODO
    public void CreateReimbursementRequest(Reimbursement r) {

    }

    //TODO 
    public void UpdateReimbursementRequest(Reimbursement r) {
        
    }
}
