package com.chickenProject.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.chickenProject.entity.Flock;

@Repository
public interface FlockRepo extends JpaRepository<Flock, Integer>{
    
}
