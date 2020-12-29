package com.revature.services;

import java.util.List;

import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.repositories.IReimbursementDAO;
import com.revature.repositories.IUserDAO;
import com.revature.repositories.ReimbursementDAOPostgres;
import com.revature.repositories.UserDAOPostgres;

public class ReimbursementServices {
    IReimbursementDAO rd;
    IUserDAO ud;
    User activeUser;

    public ReimbursementServices(User activeUser) {
        rd = new ReimbursementDAOPostgres();
        ud = new UserDAOPostgres();

        this.activeUser = activeUser;
    }

    public List<Reimbursement> GetAllReimbursements() {
        int permissionLevel = 2;
        if (activeUser.getRoleId() <= permissionLevel && activeUser.getRoleId() > 0) {
            return rd.GetAllReimbursements();
        }
        else {
            return null;
        }
    }

    public List<Reimbursement> GetReimbursementsByAuthor(int authorId) {
        int permissionLevel = 2;

        if (activeUser.getId() == authorId || (activeUser.getRoleId() > 0 && activeUser.getRoleId() <= permissionLevel)) {
            return rd.GetAllReimbursementsByAuthor(authorId);
        }
        else {
            return null;
        }
    }

    public Reimbursement GetReimbursementById(int reimbursementId) {
        int permissionLevel = 2;

        if (activeUser.getRoleId() > 0 && activeUser.getRoleId() <= permissionLevel) {
           return rd.GetReimbursementById(reimbursementId);
        }
        else {
            return null;
        }
    }

    public List<Reimbursement> GetReimbursementsByStatus(int statusId) {
        int permissionLevel = 2;
        if (activeUser.getRoleId() <= permissionLevel && activeUser.getRoleId() > 0) {
            return rd.GetAllReimbursementsByType(statusId);
        }
        else {
            return null;
        }
    }

    public List<Reimbursement> GetReimbursementsByType(int typeId) {
        int permissionLevel = 2;
        if (activeUser.getRoleId() <= permissionLevel && activeUser.getRoleId() > 0) {
            return rd.GetAllReimbursementsByType(typeId);
        }
        else {
            return null;
        }
    }

    public void AcceptReimbursementRequest(Reimbursement r) {
        int permissionLevel = 2;
        if (activeUser.getRoleId() <= permissionLevel && activeUser.getRoleId() > 0) {
            r.setStatusId(3);
            rd.UpdateReimbursement(r);
        }
    }

    public void RejectReimbursementRequest(Reimbursement r) {
        int permissionLevel = 2;
        if (activeUser.getRoleId() <= permissionLevel && activeUser.getRoleId() > 0) {
            r.setStatusId(1);
            rd.UpdateReimbursement(r);
        }
    }

    public void CreateReimbursementRequest(Reimbursement r) {
        rd.CreateReimbursement(r);
    }

    public void UpdateReimbursementRequest(Reimbursement r) {
        rd.UpdateReimbursement(r);
    }
}
