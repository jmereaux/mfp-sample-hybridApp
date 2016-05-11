package com.ibm.garage.jm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import com.worklight.server.auth.api.MissingConfigurationOptionException;
import com.worklight.server.auth.api.UserIdentity;
import com.worklight.server.auth.api.WorkLightAuthLoginModule;

public class MyCustomLoginModule implements WorkLightAuthLoginModule {

	private static final long serialVersionUID = 4094493300577236864L;

	private static final Logger logger = Logger.getLogger(MyCustomLoginModule.class.getName());

	private String USERNAME;
	private String PASSWORD;
	
	public void init(Map<String, String> options) throws MissingConfigurationOptionException {}

	public boolean login(Map<String, Object> authenticationData) {
		logger.info("MyCustomLoginModule - login");
		USERNAME = (String) authenticationData.get("username");
		PASSWORD = (String) authenticationData.get("password");

		if ((USERNAME.equals("user1") || USERNAME.equals("user2") || USERNAME.equals("use3")) && PASSWORD.equals("password")) {
			logger.info("Authentication successful");
			return true;
		}
		else {
			logger.severe("Authentication failed");
			throw new RuntimeException("Invalid credentials");
		}
	}

	public UserIdentity createIdentity(String loginModule) {
		logger.info("MyCustomLoginModule - createIdentity");
		HashMap<String, Object> customAttributes = new HashMap<String, Object>();
		customAttributes.put("AuthenticationDate", new Date());
		
		UserIdentity identity = new UserIdentity(loginModule, USERNAME, null, null, customAttributes, PASSWORD);
		return identity;
	}
	
	public void logout() {
		logger.info("MyCustomLoginModule - logout");
		USERNAME = null;
		PASSWORD = null;
	}

	public void abort() {
		logger.info("MyCustomLoginModule - abort");
		USERNAME = null;
		PASSWORD = null;
	}

	@Override
    public MyCustomLoginModule clone() throws CloneNotSupportedException {
    	logger.info("MyCustomLoginModule - clone");
        return (MyCustomLoginModule) super.clone();
    }
}
