package com.chickenProject.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.chickenProject.service.FlockService;
import com.chickenProject.service.ChickenService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import com.chickenProject.entity.Chicken;
import com.chickenProject.entity.Flock;


// Denotes that this will be a RESTFul
@RestController
@RequestMapping(value="/chicken")
@CrossOrigin("*")

public class ChickenController {
    @Autowired
    ChickenService chickenService;

    @Autowired
    FlockService flockService;

    @RequestMapping(
    		value = "/create",
    		consumes = MediaType.APPLICATION_JSON_VALUE,
    		produces = MediaType.APPLICATION_JSON_VALUE,
    		method = RequestMethod.POST
    )
    // We return a ResponseEntity<Object> because the object returned may vary, could be Chicken, could be an error
    // The RequestBody is the information sent to us to process, post and put has request body, get and delete do not
    // Request body is encrypted, always send password through a post request
    public ResponseEntity<Object> create(@RequestBody Chicken chicken) {

        try {
            chicken.setEggsLaid(0);
            Chicken savedChicken = chickenService.save(chicken);
            return new ResponseEntity<Object>(savedChicken, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }    

    @RequestMapping(
        value="/findChickenById/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE,
        method = RequestMethod.GET
    )
    public ResponseEntity<Object> findChickenById(@PathVariable Integer id) {

        try {
            Chicken foundChicken = chickenService.findById(id);
            return new ResponseEntity<Object>(foundChicken, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/findAll",
        produces = MediaType.APPLICATION_JSON_VALUE,
        method = RequestMethod.GET
    )
    public ResponseEntity<Object> findAll() {

        try {
            List<Chicken> allChicken = chickenService.findAll();
            return new ResponseEntity<Object>(allChicken, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/updateChicken",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE,
        method = RequestMethod.POST
    )
    public ResponseEntity<Object> updateChicken(@RequestBody Chicken chicken) {

        try {
            Chicken updatdChicken = chickenService.update(chicken);
            return new ResponseEntity<Object>(updatdChicken, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/deleteChicken/{id}",
        method = RequestMethod.DELETE
    )
    public ResponseEntity<Object> deleteChicken(@PathVariable Integer id) {

        try {
            // 
            chickenService.deleteById(id);
            return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/findChickenAncestorsById/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE,
        method = RequestMethod.GET
    )
    public ResponseEntity<Object> findChickenAncestorsById(@PathVariable Integer id) {

        try {
            Chicken ourChicken = chickenService.findById(id);
            List<Chicken> ancestors = chickenService.findAncestors(ourChicken);
            return new ResponseEntity<Object>(ancestors, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/getAverageByStateAndBreed/{state}/{breed}",
        method = RequestMethod.GET
    )
    public ResponseEntity<Object> getAverageByStateAndBreed(@PathVariable String state, @PathVariable String breed) {

        try {
            List<Chicken> searchResults = chickenService.findByStateAndBreed(state, breed);
            Double eggAverage = chickenService.findAverageEggsPerWeek(searchResults);
            List<Double> data = new ArrayList<Double>();
            data.add((double)searchResults.size());
            data.add(eggAverage);
            return new ResponseEntity<Object>(data, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/getAverageByZipCodeAndBreed/{zipCode}/{breed}",
        method = RequestMethod.GET
    )
    public ResponseEntity<Object> getAverageByZipCodeAndBreed(@PathVariable String zipCode, @PathVariable String breed) {

        try {
            List<Chicken> searchResults = chickenService.findByZipCodeAndBreed(zipCode, breed);
            Double eggAverage = chickenService.findAverageEggsPerWeek(searchResults);
            List<Double> data = new ArrayList<Double>();
            data.add((double)searchResults.size());
            data.add(eggAverage);
            return new ResponseEntity<Object>(data, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/getAverageByBreed/{breed}",
        method = RequestMethod.GET
    )
    public ResponseEntity<Object> getAverageByBreed(@PathVariable String breed) {

        try {
            List<Chicken> searchResults = chickenService.findByBreed(breed);
            Double eggAverage = chickenService.findAverageEggsPerWeek(searchResults);
            List<Double> data = new ArrayList<Double>();
            data.add((double)searchResults.size());
            data.add(eggAverage);
            return new ResponseEntity<Object>(data, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/findChickenEggAverage/{chickenId}",
        //consumes = MediaType.APPLICATION_JSON_VALUE,
        method = RequestMethod.GET
    )
    public ResponseEntity<Object> findChickenEggAverage(@PathVariable Integer chickenId) {

        try {
            Chicken chicken = chickenService.findById(chickenId);
            Long ageInWeeks = chickenService.calculateAgeInWeeks(chicken);
            Double weeklyAverage = 0.0;
            if (ageInWeeks > 0){
                weeklyAverage = (double)chicken.getEggsLaid()/ageInWeeks;
            } else {
                weeklyAverage = (double)chicken.getEggsLaid();
            }
            return new ResponseEntity<Object>(weeklyAverage, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
