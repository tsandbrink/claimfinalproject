package com.chickenProject.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chickenProject.entity.Flock;
import com.chickenProject.entity.Role;
import com.chickenProject.entity.User;
import com.chickenProject.repo.RoleRepo;
import com.chickenProject.repo.UserRepo;



@Service
@Transactional
public class AuthenticationService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private FlockService flockService;

    public User registerUser(String userName, String password, String email, String state, String zipCode){
        System.out.println("In register User Service");
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepo.findByAuthority("USER").get();
        
        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);
        Flock flock = flockService.save(new Flock());
        User user = new User(0, userName, email, encodedPassword, state, zipCode, authorities, flock);
        
        return userRepo.save(user);
    }

    public String loginUser(String userName, String password){
        System.out.println("In the login User path");
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userName, password)
            );

           // User user = userRepo.findByUserName(userName).get();

            return tokenService.generateJwt(auth);
            

        } catch (AuthenticationException e) {
            System.out.println("Authentication Error");
            System.out.println(e.getMessage());
            throw e;
        }

        
    }
}
