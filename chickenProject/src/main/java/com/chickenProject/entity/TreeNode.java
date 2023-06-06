package com.chickenProject.entity;

public class TreeNode {
    
    private Integer generation;
    private Integer position;


    public TreeNode() {
    }

    public TreeNode(Integer generation, Integer position) {
        this.generation = generation;
        this.position = position;
    }

    public Integer getGeneration() {
        return generation;
    }
    public void setGeneration(Integer generation) {
        this.generation = generation;
    }
    public Integer getPosition() {
        return position;
    }
    public void setPosition(Integer position) {
        this.position = position;
    }


}
