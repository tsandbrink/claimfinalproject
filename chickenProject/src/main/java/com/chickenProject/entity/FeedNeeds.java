package com.chickenProject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table  (name="FeedNeeds")
public class FeedNeeds {

    // ID lets you know its an id
    @Id
    // Column maps to the same name as the column name in the database, it is case sensitive
    @Column(name = "id")
    // This will configure your id to be auto generated, now you don't need a setter for your id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ageInWeeks")
    private Long ageInWeeks;

    @Column(name = "feedNeed")
    private Double feedNeed;

   /* private Map<Integer, Double> feedNeedsPerWeekAge = Map.ofEntries(
        Map.entry(0, 1.7),
        Map.entry(2, 4.9),
        Map.entry(4, 9.1),
        Map.entry(6, 12.0),
        Map.entry(8, 12.7),
        Map.entry(10, 13.4),
        Map.entry(12, 14.1),
        Map.entry(14, 14.8),
        Map.entry(16, 15.2),
        Map.entry(18, 15.9),
        Map.entry(20, 17.6),
        Map.entry(21, 24.7) //21 weeks is considered an adult
    );*/

    public FeedNeeds(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getAgeInWeeks() {
        return ageInWeeks;
    }

    public void setAgeInWeeks(Long ageInWeeks) {
        this.ageInWeeks = ageInWeeks;
    }

    public Double getFeedNeed() {
        return feedNeed;
    }

    public void setFeedNeed(Double feedNeed) {
        this.feedNeed = feedNeed;
    }
    


}
