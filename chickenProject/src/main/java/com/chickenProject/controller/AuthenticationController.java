package com.chickenProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chickenProject.entity.LoginDTO;
import com.chickenProject.entity.LoginResponseDTO;
import com.chickenProject.entity.RegistrationDTO;
import com.chickenProject.entity.User;
import com.chickenProject.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public User registerUser(@RequestBody RegistrationDTO body){
        System.out.println("In the register path");
        return authenticationService.registerUser(body.getUserName(), body.getPassword(), body.getEmail(), body.getState(), body.getZipCode());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginDTO body){
        System.out.println("In the Login Path");
        String jwt = authenticationService.loginUser(body.getUserName(), body.getPassword());
        return new LoginResponseDTO(jwt);
    }
}
