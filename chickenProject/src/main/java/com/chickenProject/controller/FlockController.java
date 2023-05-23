package com.chickenProject.controller;

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

import com.chickenProject.entity.Flock;
import com.chickenProject.entity.Chicken;
import com.chickenProject.service.FlockService;

// Denotes that this will be a RESTFul
@RestController
@RequestMapping(value="/flock")
@CrossOrigin("*")

public class FlockController {
        // You can autowire any service you need to get the data from
        @Autowired
        FlockService flockService;
    
    
        @RequestMapping(
                value = "/create",
                consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE,
                method = RequestMethod.POST
        )
        // We return a ResponseEntity<Object> because the object returned may vary, could be flock, could be an error
        // The RequestBody is the information sent to us to process, post and put has request body, get and delete do not
        // Request body is encrypted, always send password through a post request
        public ResponseEntity<Object> create(@RequestBody Flock flock) {
    
            try {
                Flock savedFlock = flockService.save(flock);
                return new ResponseEntity<Object>(savedFlock, HttpStatus.CREATED);
            } catch (Exception e) {
                System.out.println(e);
                return new ResponseEntity<Object>(e, HttpStatus.BAD_REQUEST);
            } catch (Error e) {
                System.out.println(e);
                return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    
        }
    
        @RequestMapping(
            value="/findFlockById/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.GET
        )
        public ResponseEntity<Object> findFlockById(@PathVariable Integer id) {
    
            try {
                Flock foundFlock = flockService.findById(id);
                return new ResponseEntity<Object>(foundFlock, HttpStatus.OK);
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
                List<Flock> allFlock = flockService.findAll();
                return new ResponseEntity<Object>(allFlock, HttpStatus.OK);
            } catch (Exception e) {
                System.out.println(e);
                return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
            } catch (Error e) {
                System.out.println(e);
                return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    
        }
    
        @RequestMapping(
            value="/updateFlock",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.POST
        )
        public ResponseEntity<Object> updateFlock(@RequestBody Flock flock) {
    
            try {
                Flock updatdFlock = flockService.update(flock);
                return new ResponseEntity<Object>(updatdFlock, HttpStatus.OK);
            } catch (Exception e) {
                System.out.println(e);
                return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
            } catch (Error e) {
                System.out.println(e);
                return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    
        }
    
        @RequestMapping(
            value="/deleteFlock/{id}",
            method = RequestMethod.DELETE
        )
        public ResponseEntity<Object> deleteFlock(@PathVariable Integer id) {
    
            try {
                // 
                flockService.deleteById(id);
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
            value="/addChickenToFlock/{flockId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            method = RequestMethod.POST
        )
        public ResponseEntity<Object> addChickenToFlock(@PathVariable Integer flockId, @RequestBody Chicken chicken) {
    
            try {
                Flock flock = flockService.addChickenToFlock(flockId, chicken);
    
                return new ResponseEntity<Object>(flock, HttpStatus.OK);
            } catch (Exception e) {
                System.out.println(e);
                return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
            } catch (Error e) {
                System.out.println(e);
                return new ResponseEntity<Object>(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    
        }
}
