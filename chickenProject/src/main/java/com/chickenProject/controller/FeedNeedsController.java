package com.chickenProject.controller;

import com.chickenProject.entity.FeedNeeds;
import com.chickenProject.entity.Flock;
import com.chickenProject.service.FeedNeedsService;
import com.chickenProject.service.FlockService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

// Denotes that this will be a RESTFul
@RestController
@RequestMapping(value="/feedNeeds")
@CrossOrigin("*")
public class FeedNeedsController {
    @Autowired
    FeedNeedsService feedNeedsService;

    @Autowired
    FlockService flockService;

    @RequestMapping(
    		value = "/create",
    		consumes = MediaType.APPLICATION_JSON_VALUE,
    		produces = MediaType.APPLICATION_JSON_VALUE,
    		method = RequestMethod.POST
    )
    // We return a ResponseEntity<Object> because the object returned may vary, could be FeedNeeds, could be an error
    // The RequestBody is the information sent to us to process, post and put has request body, get and delete do not
    // Request body is encrypted, always send password through a post request
    public ResponseEntity<Object> create(@RequestBody FeedNeeds feedNeeds) {

        try {
            FeedNeeds savedFeedNeeds = feedNeedsService.save(feedNeeds);
            return new ResponseEntity<Object>(savedFeedNeeds, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.BAD_REQUEST);
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
            List<FeedNeeds> allFeedNeeds = feedNeedsService.findAll();
            return new ResponseEntity<Object>(allFeedNeeds, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/updateFeedNeeds",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE,
        method = RequestMethod.POST
    )
    public ResponseEntity<Object> updateFeedNeeds(@RequestBody FeedNeeds FeedNeeds) {

        try {
            FeedNeeds updatdFeedNeeds = feedNeedsService.update(FeedNeeds);
            return new ResponseEntity<Object>(updatdFeedNeeds, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(
        value="/deleteFeedNeeds/{id}",
        method = RequestMethod.DELETE
    )
    public ResponseEntity<Object> deleteFeedNeeds(@PathVariable Integer id) {

        try {
            // 
            feedNeedsService.deleteById(id);
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
        value="/calculateFeedNeeds/{id}",
        method = RequestMethod.GET
    )
    public ResponseEntity<Object> getFlockFeedNeeds(@PathVariable Integer id) {

        try {
            Flock flock = flockService.findById(id);
            Double totalFeedNeeds = feedNeedsService.getFlockFeedNeeds(flock);
            return new ResponseEntity<Object>(totalFeedNeeds, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e);
            return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
