package com.chickenProject.entity;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;

import com.chickenProject.service.FlockService;

public class UserDetailsDTO {
    private String username;
    private Integer id;
    private String email;
    private String state;
    private String zipCode;
    private Flock userFlock;
    
    @Autowired
    FlockService flockService;
    
    private Set<? extends GrantedAuthority> roles;

    public UserDetailsDTO(String username, Integer id, String email, String state, String zipCode, Flock userFlock) {
        this.username = username;
        this.id = id;
        this.email = email;
        //this.roles = new HashSet<>(roles);
        this.state = state;
        this.zipCode = zipCode;
        this.userFlock = userFlock;
    }
        // Getters and setters for all the fields
        public String getUsername() {
            return username;
        }
    
        public void setUsername(String username) {
            this.username = username;
        }
    
        public Integer getId() {
            return id;
        }
    
        public void setId(Integer id) {
            this.id = id;
        }
    
        public String getEmail() {
            return email;
        }
    
        public void setEmail(String email) {
            this.email = email;
        }
        public Set<? extends GrantedAuthority> getRoles() {
            return roles;
        }
        public void setRoles(Set<? extends GrantedAuthority> roles) {
            this.roles = roles;
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
        public Flock getFlock() {
            return userFlock;
        }
        public void setFlock(Flock userFlock) {
            this.userFlock = userFlock;
        }
}
