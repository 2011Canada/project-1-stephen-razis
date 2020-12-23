package com.revature.repositories;

import java.util.List;

import com.revature.models.User;

public interface IUserDAO {
	
	public User GetUserById();
	
	public List<User> GetAllUsers();
	
	public List<User> GetAllUsersByType(int typeId);
	
	public void UpdateUser(User user);
}
