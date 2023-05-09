package com.chickenProject.entity;



import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

// Annotate Objects with Entity, lets project know its a Object from the DB
@Entity
// Tells what table the object is coming from
@Table(name="user")
public class User {
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
     @Column(name = "userEmail", unique = true, nullable = false)
     private String userEmail;
     @Column(name = "zipCode", nullable = false)
     private String zipCode;
     
     @OneToOne (cascade = CascadeType.ALL)
     @JoinColumn(name = "flock_ID")
     private Flock userFlock;
 
     //----------------------------///
     public User() {}
 
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
 
     public String getUserEmail() {
         return userEmail;
     }
 
     public void setUserEmail(String userEmail) {
         this.userEmail = userEmail;
     }
 
     @Override
     public String toString() {
         return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", email=" + userEmail + ", zipCode=" + zipCode + "]";
     }
}
