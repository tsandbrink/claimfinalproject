package com.chickenProject.service;

import java.util.ArrayList;
import java.util.List;

import com.chickenProject.entity.Chicken;

public class ChickenService {
    


    //method to get feed needs of a chick
    // getFeedNeeds(chicken){
    // double ageInWeeks = current date - chicken.get date of birth / 7
    // if age > 21 age = 21
    // if age is < 21 and odd - 1
    // Double feed = chickenFeedNeed.get(age)
    // Return feed
    //}
    // 

    public List<Chicken> getDescendants(Chicken chicken){
        List<Chicken> descendants = new ArrayList<Chicken>();
        getChildren(chicken, descendants);
        return descendants;
    }

    //Recursive Method where Takes in a chicken and a list and adds the children to the list then adds the children of the children to the list and then children of children of children and so on...
    public void getChildren(Chicken chicken, List<Chicken> descendants){
        for (Chicken c:chicken.getChildren()) {
            descendants.add(c);
            if(c.getChildren().size() == 0){
                return;
            } else {
                getChildren(c, descendants);
            }
        }
    }
}
