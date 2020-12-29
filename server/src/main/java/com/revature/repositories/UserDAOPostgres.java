package com.revature.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.revature.models.User;
import com.revature.utils.ConnectionFactory;

public class UserDAOPostgres implements IUserDAO {
	ConnectionFactory cf = ConnectionFactory.getConnectionFactory();
	
    public User GetUserById(int id) {
        Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.users WHERE users_id = ?;";

		User u = null;
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, id);
			
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
                int roleId = rs.getInt("role_id");
				String username = rs.getString("username");
                String firstName = rs.getString("first_name");
                String lastName = rs.getString("last_name");
				String email = rs.getString("email");

				u = new User(id, roleId, username, firstName, lastName, email);
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
		
		return u;
    }
	
	public List<User> GetAllUsers() {
        Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.users;";

		List<User> users = new ArrayList<User>();
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
				int id = rs.getInt("users_id");
                int roleId = rs.getInt("role_id");
				String username = rs.getString("username");
                String firstName = rs.getString("first_name");
                String lastName = rs.getString("last_name");
				String email = rs.getString("email");

				User u = new User(id, roleId, username, firstName, lastName, email);
                users.add(u);
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
		
		return users;
    }
	
	public List<User> GetAllUsersByRole(int roleId) {
        Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.users WHERE role_id = ?;";

		List<User> users = new ArrayList<User>();
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, roleId);
			
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
                int id = rs.getInt("users_id");
				String username = rs.getString("username");
                String firstName = rs.getString("first_name");
                String lastName = rs.getString("last_name");
				String email = rs.getString("email");

				User u = new User(id, roleId, username, firstName, lastName, email);
                users.add(u);
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
		
		return users;
    }

	public User FindUserByCredentials(String username, String password) {
        Connection conn = cf.getConnection();
		
		String sql = "SELECT * FROM reimbursomatic.users WHERE users_id = ? AND users_password = ?;";

		User u = null;
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, username);
            ps.setString(2, password);
			
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
                int id = rs.getInt("users_id");
                int roleId = rs.getInt("role_id");
                String firstName = rs.getString("first_name");
                String lastName = rs.getString("last_name");
				String email = rs.getString("email");

				u = new User(id, roleId, username, firstName, lastName, email);
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
		
		return u;
    }
	
	public void UpdateUser(User user) {
        Connection conn = cf.getConnection();
		
		String sql = "UPDATE reimbursomatic.users SET first_name = ?, last_name = ?, email = ?, role_id = ? WHERE users_id = ?;";
		
		try {
			
			PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, user.getFirstName());
            ps.setString(2, user.getLastName());
            ps.setString(3, user.getEmail());
            ps.setInt(4, user.getRoleId());
            ps.setInt(5, user.getId());
			
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
