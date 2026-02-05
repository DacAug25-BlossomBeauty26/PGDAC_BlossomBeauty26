package com.example.DTO;

public class UserRegisterDTO {

	private String firstName;   
	private String lastName;
    private String username;
    private String contact;
    private String email;
    private String password;
 
    private Integer areaId;
    
    
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Integer getAreaId() { return areaId; }
	public void setAreaId(Integer areaId) { this.areaId = areaId; }
	

  
}
