package com.chickenProject.entity;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;



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

    @OneToMany (cascade = CascadeType.ALL)
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
