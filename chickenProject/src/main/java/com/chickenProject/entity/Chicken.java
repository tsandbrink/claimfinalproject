package com.chickenProject.entity;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

// Annotate Objects with Entity, lets project know its a Object from the DB
@Entity
// Tells what table the object is coming from
@Table(name="chicken")
public class Chicken {
    
    // ID lets you know its an id
    @Id
    // Column maps to the same name as the column name in the database, it is case sensitive
    @Column(name = "id")
    // This will configure your id to be auto generated, now you don't need a setter for your id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Column(name = "sex")
    private String sex;

    @Column(name = "breed")
    private String breed;

    @Column(name = "isDead", nullable = false)
    private Boolean isDead;

    @OneToOne
    @JoinColumn(name = "mother_ID")
    private Chicken mother;

    @OneToOne
    @JoinColumn(name = "father_ID")
    private Chicken father;

    /*@ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "child_ID")
    private List<Chicken> parents;*/

    @OneToMany
    @JoinColumn(name="parent_ID")
    private List<Chicken> children;


    public Chicken() {
    }

    //---Getter and Setter ----//

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public Boolean getIsDead() {
        return isDead;
    }

    public void setIsDead(Boolean isDead) {
        this.isDead = isDead;
    }

    public Chicken getMother() {
        return mother;
    }

    public void setMother(Chicken mother) {
        this.mother = mother;
    }

    public Chicken getFather() {
        return father;
    }

    public void setFather(Chicken father) {
        this.father = father;
    }

    /*public List<Chicken> getParents() {
        return parents;
    }

    public void setParents(List<Chicken> parents) {
        this.parents = parents;
    }*/

    public List<Chicken> getChildren() {
        return children;
    }

    public void setChildren(List<Chicken> children) {
        this.children = children;
    }

    
    

}
