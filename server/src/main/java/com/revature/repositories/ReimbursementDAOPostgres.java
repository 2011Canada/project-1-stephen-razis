package com.revature.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.revature.models.Reimbursement;
import com.revature.utils.ConnectionFactory;

public class ReimbursementDAOPostgres implements IReimbursementDAO {

    //NOTE: all of these methods do not support receipts currently
	ConnectionFactory cf = ConnectionFactory.getConnectionFactory();
	
    public void CreateReimbursement(Reimbursement reimbursement) {
        Connection conn = cf.getConnection();
		
		String sqlReimbursement = "INSERT INTO reimbursomatic.reimbursements (amount, submitted, description, author, status_id, type_id) VALUES (?, ?, ?, ?, ?, ?);";
		
		try {
			conn.setAutoCommit(false);
			
			PreparedStatement ps = conn.prepareStatement(sqlReimbursement);
			ps.setDouble(1, reimbursement.getAmount());
            ps.setTimestamp(2, reimbursement.getSubmitted());
            ps.setString(3, reimbursement.getDescription());
            ps.setInt(4, reimbursement.getAuthorId());
            ps.setInt(5, reimbursement.getStatusId());
            ps.setInt(6, reimbursement.getTypeId());
            
            ps.executeUpdate();

			conn.commit();
		}
		catch (SQLException e1) {
			e1.printStackTrace();
			if (conn != null) {
				try {
					System.out.println("Transaction is being rolled back.");
					conn.rollback();
				}
				catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
		finally {
			try {
				conn.setAutoCommit(true);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
    }

    public List<Reimbursement> GetAllReimbursements() {
	    Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.reimbursements;";

		List<Reimbursement> reimbursements = new ArrayList<Reimbursement>();
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
                int id = rs.getInt("reimbursements_id");
                double amount = rs.getDouble("amount");
                Timestamp submitted = rs.getTimestamp("submitted");
                Timestamp resolved = rs.getTimestamp("resolved");
                String description = rs.getString("description");
                int authId = rs.getInt("author");
                int typeId = rs.getInt("type_id");
                int resolverId = rs.getInt("resolver");
                int statusId = rs.getInt("status_id");
                
                Reimbursement r;
                if (resolved != null) {
				    r = new Reimbursement(id, amount, submitted, resolved, description, authId, typeId, resolverId, statusId);
                } else {
                    r = new Reimbursement(id, amount, submitted, authId, typeId);
                    r.setDescription(description);
                }

                reimbursements.add(r);
			}
		}
		catch (SQLException e1) {
			e1.printStackTrace();
			if (conn != null) {
				try {
					System.out.println("Transaction is being rolled back.");
					conn.rollback();
				}
				catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
		
		return reimbursements;
    }

	public List<Reimbursement> GetAllReimbursementsByAuthor(int authorId) {
        Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.reimbursements WHERE author = ?;";

		List<Reimbursement> reimbursements = new ArrayList<Reimbursement>();
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, authorId);

			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
                int id = rs.getInt("reimbursements_id");
                double amount = rs.getDouble("amount");
                Timestamp submitted = rs.getTimestamp("submitted");
                Timestamp resolved = rs.getTimestamp("resolved");
                String description = rs.getString("description");
                int typeId = rs.getInt("type_id");
                int resolverId = rs.getInt("resolver");
                int statusId = rs.getInt("status_id");

                Reimbursement r;
                if (resolved != null) {
				    r = new Reimbursement(id, amount, submitted, resolved, description, authorId, typeId, resolverId, statusId);
                } else {
                    r = new Reimbursement(id, amount, submitted, authorId, typeId);
                    r.setDescription(description);
                }

                reimbursements.add(r);
			}
		}
		catch (SQLException e1) {
			e1.printStackTrace();
			if (conn != null) {
				try {
					System.out.println("Transaction is being rolled back.");
					conn.rollback();
				}
				catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
		
		return reimbursements;
    }
	
    public List<Reimbursement> GetAllReimbursementsByResolver(int resolverId) {
        Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.reimbursements WHERE resolver = ?;";

		List<Reimbursement> reimbursements = new ArrayList<Reimbursement>();
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, resolverId);

			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
                int id = rs.getInt("reimbursements_id");
                double amount = rs.getDouble("amount");
                Timestamp submitted = rs.getTimestamp("submitted");
                Timestamp resolved = rs.getTimestamp("resolved");
                String description = rs.getString("description");
                int authId = rs.getInt("author");
                int typeId = rs.getInt("type_id");
                int statusId = rs.getInt("status_id");

				Reimbursement r = new Reimbursement(id, amount, submitted, resolved, description, authId, typeId, resolverId, statusId);
                reimbursements.add(r);
			}
		}
		catch (SQLException e1) {
			e1.printStackTrace();
			if (conn != null) {
				try {
					System.out.println("Transaction is being rolled back.");
					conn.rollback();
				}
				catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
		
		return reimbursements;
    }

	public List<Reimbursement> GetAllReimbursementsByType(int typeId) {
        Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.reimbursements WHERE type_id = ?;";

		List<Reimbursement> reimbursements = new ArrayList<Reimbursement>();
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, typeId);

			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
                int id = rs.getInt("reimbursements_id");
                double amount = rs.getDouble("amount");
                Timestamp submitted = rs.getTimestamp("submitted");
                Timestamp resolved = rs.getTimestamp("resolved");
                String description = rs.getString("description");
                int authId = rs.getInt("author");
                int resolverId = rs.getInt("resolver");
                int statusId = rs.getInt("status_id");

                Reimbursement r;
                if (resolved != null) {
				    r = new Reimbursement(id, amount, submitted, resolved, description, authId, typeId, resolverId, statusId);
                } else {
                    r = new Reimbursement(id, amount, submitted, authId, typeId);
                    r.setDescription(description);
                }

                reimbursements.add(r);
			}
		}
		catch (SQLException e1) {
			e1.printStackTrace();
			if (conn != null) {
				try {
					System.out.println("Transaction is being rolled back.");
					conn.rollback();
				}
				catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
		
		return reimbursements;
    }
	
	public List<Reimbursement> GetAllReimbursementsByStatus(int statusId) {
        Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.reimbursements WHERE status_id = ?;";

		List<Reimbursement> reimbursements = new ArrayList<Reimbursement>();
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, statusId);

			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
                int id = rs.getInt("reimbursements_id");
                double amount = rs.getDouble("amount");
                Timestamp submitted = rs.getTimestamp("submitted");
                Timestamp resolved = rs.getTimestamp("resolved");
                String description = rs.getString("description");
                int authId = rs.getInt("author");
                int typeId = rs.getInt("type_id");
                int resolverId = rs.getInt("resolver");

                Reimbursement r;
                if (resolved != null) {
				    r = new Reimbursement(id, amount, submitted, resolved, description, authId, typeId, resolverId, statusId);
                } else {
                    r = new Reimbursement(id, amount, submitted, authId, typeId);
                    r.setDescription(description);
                }

                reimbursements.add(r);
			}
		}
		catch (SQLException e1) {
			e1.printStackTrace();
			if (conn != null) {
				try {
					System.out.println("Transaction is being rolled back.");
					conn.rollback();
				}
				catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
		
		return reimbursements;
    }

	public Reimbursement GetReimbursementById(int id) {
        Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.reimbursements WHERE reimbursements_id = ?;";

		Reimbursement r = null;
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, id);

			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
                double amount = rs.getDouble("amount");
                Timestamp submitted = rs.getTimestamp("submitted");
                Timestamp resolved = rs.getTimestamp("resolved");
                String description = rs.getString("description");
                int authId = rs.getInt("author");
                int typeId = rs.getInt("type_id");
                int resolverId = rs.getInt("resolver");
                int statusId = rs.getInt("status_id");

                if (resolved != null) {
				    r = new Reimbursement(id, amount, submitted, resolved, description, authId, typeId, resolverId, statusId);
                } else {
                    r = new Reimbursement(id, amount, submitted, authId, typeId);
                    r.setDescription(description);
                }
			}
		}
		catch (SQLException e1) {
			e1.printStackTrace();
			if (conn != null) {
				try {
					System.out.println("Transaction is being rolled back.");
					conn.rollback();
				}
				catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
		
		return r;
    }
	
	public void UpdateReimbursement(Reimbursement reimbursement) {
        Connection conn = cf.getConnection();
		
		String sql = "UPDATE reimbursomatic.reimbursements SET amount = ?, submitted = ?, resolved = ?, description = ?, author = ?, resolver = ?, status_id = ?, type_id = ? WHERE reimbursements_id = ?;";
		
		try {
			
			PreparedStatement ps = conn.prepareStatement(sql);
            ps.setDouble(1, reimbursement.getAmount());
            ps.setTimestamp(2, reimbursement.getSubmitted());
            ps.setTimestamp(3, reimbursement.getResolved());
            ps.setString(4, reimbursement.getDescription());
            ps.setInt(5, reimbursement.getAuthorId());
            ps.setInt(6, reimbursement.getResolverId());
            ps.setInt(7, reimbursement.getStatusId());
            ps.setInt(8, reimbursement.getTypeId());
            ps.setInt(9, reimbursement.getId());
			
			ps.executeUpdate();
		}
		catch (SQLException e1) {
			e1.printStackTrace();
			if (conn != null) {
				try {
					System.out.println("Transaction is being rolled back.");
					conn.rollback();
				}
				catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
    }
}
