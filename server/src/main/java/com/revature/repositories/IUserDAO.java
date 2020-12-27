package com.revature.repositories;

import java.util.List;

import com.revature.models.User;

public interface IUserDAO {
	
	public User GetUserById(int id);
	
	public List<User> GetAllUsers();
	
	public List<User> GetAllUsersByRole(int roleId);

	public User FindUserByCredentials(String username, String password);
	
	public void UpdateUser(User user);
}
