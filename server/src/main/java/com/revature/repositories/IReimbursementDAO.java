package com.revature.repositories;

import java.util.List;

import com.revature.models.Reimbursement;
import com.revature.models.User;

public interface IReimbursementDAO {

	public List<Reimbursement> GetAllReimbursements();
	
	public List<Reimbursement> GetAllReimbursementsByUser(User user);
	
	public List<Reimbursement> GetAllReimbursementsByType(int reimbursementType);
	
	public Reimbursement GetReimbursementById(int reimbursementId);
	
	public void UpdateReimbursement(Reimbursement reimbursement);
	
}
