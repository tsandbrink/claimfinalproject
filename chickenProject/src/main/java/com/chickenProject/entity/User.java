package com.chickenProject.entity;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

// Annotate Objects with Entity, lets project know its a Object from the DB
@Entity
// Tells what table the object is coming from
@Table(name="user")
public class User implements UserDetails {
     // ID lets you know its an id
     @Id
     // Column maps to the same name as the column name in the database, it is case sensitive
     @Column(name = "id")
     // This will configure your id to be auto generated, now you don't need a setter for your id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Integer id;
 
     @Column(name = "userName", unique = true, nullable = false)
     private String userName;
     @Column(name = "password", nullable = false)
     private String password;
     @Column(name = "email", unique = true, nullable = false)
     private String email;
     @Column(name = "zipCode", nullable = false)
     private String zipCode;
     @Column(name = "state")
     private String state;
     
     

    @OneToOne (cascade = CascadeType.ALL)
     @JoinColumn(name = "flock_ID")
     private Flock userFlock;

     @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name="user_role_junction",
        joinColumns = {@JoinColumn(name="id")},
        inverseJoinColumns = {@JoinColumn(name="role_id")}
    )
    private Set<Role> authorities;
 
    //----------------------------///
     public User() {
        super();
        this.authorities = new HashSet<Role>();
     }


     public User (Integer id, String userName, String email, String password, String state, String zipCode, Set<Role> authorities, Flock userFlock){
        this.id = id;
        this.userName=userName;
        this.password=password;
        this.email = email;
        this.state = state;
        this.zipCode = zipCode;
        this.authorities=authorities;
        this.userFlock = userFlock;
    }
 
     public Flock getUserFlock() {
         return userFlock;
     }
 
     public void setUserFlock(Flock userFlock) {
         this.userFlock = userFlock;
     }
 
     public Integer getId() {
         return id;
     }
 
     public void setId(Integer id) {
         this.id = id;
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
 
     public String getZipCode() {
         return zipCode;
     }
 
     public void setZipCode(String zipCode) {
         this.zipCode = zipCode;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       return this.authorities;
    }

    public void setAuthorities(Set<Role> authorities) {
        this.authorities = authorities;
    }

     @Override
     public String toString() {
         return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", email=" + email + ", zipCode=" + zipCode + "]";
     }

    @Override
    public String getUsername() {
        return this.userName;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }


    @Override
    public boolean isAccountNonLocked() {
        return true;
    }


    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    @Override
    public boolean isEnabled() {
        return true;
    }
}
