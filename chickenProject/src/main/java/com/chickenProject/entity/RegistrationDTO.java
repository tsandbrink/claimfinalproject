package com.chickenProject.entity;

public class RegistrationDTO {
    private String userName;
    private String password;
    private String email;
    private String state;
    private String zipCode;

    public RegistrationDTO(){
        super();
    }

    public RegistrationDTO(String userName, String password, String email, String state, String zipCode){
        super();
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.state = state;
        this.zipCode = zipCode;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String toString(){
        return ("Registration info: username: " + this.userName + "password:" + this.password);
    }
}
