package com.example.DTO;

public class LoginResponseDTO {

    private String message;
    private Long userId;
    private String username;
    private String role;
    private String area;
    private String email;
    private Status status;

    public enum Status {
        ACTIVE,
        BLOCKED
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	 public Status getStatus() {
	        return status;
	    }

	    public void setStatus(Status status) {
	        this.status = status;
	    }

	
}
