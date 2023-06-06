package com.chickenProject.entity;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="Flock")
public class Flock {

    // ID lets you know its an id
    @Id
    // Column maps to the same name as the column name in the database, it is case sensitive
    @Column(name = "id")
    // This will configure your id to be auto generated, now you don't need a setter for your id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @OneToMany
    @JoinColumn(name="flock_id", referencedColumnName="id")
    private List<Chicken> chickensInFlock;

    //Constructor, Getters, and Setters --------//
    public Flock() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Chicken> getChickensInFlock() {
        return chickensInFlock;
    }

    public void setChickensInFlock(List<Chicken> chickensInFlock) {
        this.chickensInFlock = chickensInFlock;
    }

    
}
