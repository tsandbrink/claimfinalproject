package com.chickenProject.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.chickenProject.entity.Chicken;


@Repository
public interface ChickenRepo extends JpaRepository<Chicken, Integer>{
    @Query(value="select * from chicken where name = ?1", nativeQuery = true) //make sure field matches database exactly
    public Chicken findByName(String name);

    @Query(value="select * from chicken where state = ?1 and breed = ?2 and sex = 'female'", nativeQuery = true)
    public List<Chicken> findByStateAndBreed(String state, String breed);

    @Query(value="select * from chicken where zip_code = ?1 and breed = ?2 and sex = 'female'", nativeQuery = true)
    public List<Chicken> findByZipCodeAndBreed(String zipCode, String breed);

    @Query(value="select * from chicken where breed = ?1 and sex = 'female'", nativeQuery = true)
    public List<Chicken> findByBreed(String breed);
}