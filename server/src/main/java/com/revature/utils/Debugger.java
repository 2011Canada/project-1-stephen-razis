package com.revature.utils;

import java.sql.Timestamp;
import java.util.List;

import com.revature.models.Reimbursement;
import com.revature.repositories.IReimbursementDAO;
import com.revature.repositories.IUserDAO;
import com.revature.repositories.ReimbursementDAOPostgres;
import com.revature.repositories.UserDAOPostgres;

public class Debugger {
	
	public static void main(String[] args) {
		IReimbursementDAO rd = new ReimbursementDAOPostgres();
		IUserDAO ud = new UserDAOPostgres();
		
		//RD DAO IS WORKING
		System.out.println("======================");
		System.out.println("ReimbursementDAO Tests");
		System.out.println("======================");
		System.out.println();
		
		
		//CreateReimbursement
		System.out.println("CREATE");
		Timestamp now = new Timestamp(System.currentTimeMillis());
		Reimbursement r0 = new Reimbursement(0, 1000000.00, now, 1, 4);
		rd.CreateReimbursement(r0);
		System.out.println(rd.GetReimbursementById(4));
		
		//CreateReimbursement
		System.out.println("UPDATE");
		r0 = rd.GetReimbursementById(2);
		r0.setDescription("UPDATING DESCRIPTION TEST");
		rd.UpdateReimbursement(r0);
		System.out.println(rd.GetReimbursementById(2));
		
		
		//GetAllReimbursements
		System.out.println("ALL");
		List<Reimbursement> reimbursements = rd.GetAllReimbursements();
		for(Reimbursement r : reimbursements) {
			System.out.println(r);
		}
		
		//GetAllReimbursementsByAuthor
		System.out.println("AUTHOR 6");
		reimbursements = rd.GetAllReimbursementsByAuthor(6);
		for(Reimbursement r : reimbursements) {
			System.out.println(r);
		}
		
		//GetAllReimbursementsByResolver
		System.out.println("RESOLVER 4");
		reimbursements = rd.GetAllReimbursementsByResolver(4);
		for(Reimbursement r : reimbursements) {
			System.out.println(r);
		}
		
		//GetAllReimbursementsByStatus
		System.out.println("STATUS 2");
		reimbursements = rd.GetAllReimbursementsByStatus(2);
		for(Reimbursement r : reimbursements) {
			System.out.println(r);
		}
		
		//GetAllReimbursementsByType
		System.out.println("TYPE 1");
		reimbursements = rd.GetAllReimbursementsByType(1);
		for(Reimbursement r : reimbursements) {
			System.out.println(r);
		}
		
		//GetReimbursementById
		System.out.println("ID 1");
		System.out.println(rd.GetReimbursementById(1));
		
		System.out.println();
		System.out.println();
		
		System.out.println("======================");
		System.out.println("UserDAO Tests");
		System.out.println("======================");
		System.out.println();
		
		
		
	}
	
}
