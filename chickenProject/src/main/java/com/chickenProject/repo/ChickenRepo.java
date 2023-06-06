package com.chickenProject.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.chickenProject.entity.Chicken;


@Repository
public interface ChickenRepo extends JpaRepository<Chicken, Integer>{
    @Query(value="select * from chicken where name = ?1", nativeQuery = true) //make sure field matches database exactly
    public Chicken findByName(String name);
}