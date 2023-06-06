package com.chickenProject.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.chickenProject.entity.FeedNeeds;
import com.chickenProject.entity.Flock;

@Repository
public interface FeedNeedsRepo extends JpaRepository<FeedNeeds, Integer>{
    @Query(value="select * from feed_needs where age_in_weeks = ?1", nativeQuery = true) //make sure field matches database exactly
    public FeedNeeds findByAge(Long age);
}
