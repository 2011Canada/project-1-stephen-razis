package com.revature.repositories;

import java.util.List;

import com.revature.models.Reimbursement;
import com.revature.models.User;

public interface IReimbursementDAO {

	public void CreateReimbursement(Reimbursement reimbursement);
	
	public List<Reimbursement> GetAllReimbursements();
	
	public List<Reimbursement> GetAllReimbursementsByAuthor(int authorId);

	public List<Reimbursement> GetAllReimbursementsByResolver(int resolverId);
	
	public List<Reimbursement> GetAllReimbursementsByType(int typeId);
	
	public List<Reimbursement> GetAllReimbursementsByStatus(int statusId);

	public Reimbursement GetReimbursementById(int id);
	
	public void UpdateReimbursement(Reimbursement reimbursement);
	
}
