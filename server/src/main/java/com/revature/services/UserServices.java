package com.revature.services;

import java.util.List;

import com.revature.models.User;
import com.revature.repositories.IUserDAO;
import com.revature.repositories.UserDAOPostgres;

public class UserServices {
    IUserDAO ud;
    User activeUser;

    public UserServices(User activeUser) {
        ud = new UserDAOPostgres();

        this.activeUser = activeUser;
    }

    public User Login(String username, String password) {
        User u = ud.FindUserByCredentials(username, password);
        activeUser = u;
        
        return u;
    }

    public void UpdateFirstName(String firstName) {
        activeUser.setFirstName(firstName);
        ud.UpdateUser(activeUser);
    }

    public void UpdateLastName(String lastName) {
        activeUser.setLastName(lastName);
        ud.UpdateUser(activeUser);
    }

    public void UpdateEmail(String email) {
        activeUser.setEmail(email);
        ud.UpdateUser(activeUser);
    }

    public User GetUserById(int id) {
    	return ud.GetUserById(id);
    }

    public List<User> GetAllUsers() {
        int permissionLevel = 2;
        if (activeUser.getRoleId() <= permissionLevel && activeUser.getRoleId() > 0) {
            return ud.GetAllUsers();
        }
        return null;
    }

    public List<User> GetUsersByRole(int roleId) {
        int permissionLevel = 2;
        if (roleId > 0 && roleId < 4 && (activeUser.getRoleId() <= permissionLevel && activeUser.getRoleId() > 0)) {
            return ud.GetAllUsersByRole(roleId);
        }
        else {
            return null;
        }
    }
}
