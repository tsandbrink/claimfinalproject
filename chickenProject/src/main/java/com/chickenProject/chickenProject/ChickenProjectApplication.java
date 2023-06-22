package com.chickenProject.chickenProject;



import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.chickenProject.entity.Flock;
import com.chickenProject.entity.Role;
import com.chickenProject.entity.User;
import com.chickenProject.repo.RoleRepo;
import com.chickenProject.repo.UserRepo;

// Lets your project know its a spring boot application
@SpringBootApplication

// YOU MUST COME AND PUT THIS LINE OF CODE IN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Lets your project know where all your Spring Beans are
// Spring beans are your annotated classes, like controllers, services, entities, repos
@ComponentScan(basePackages = "com.chickenProject")
public class ChickenProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChickenProjectApplication.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepo roleRepo, UserRepo userRepo, PasswordEncoder passwordEncoder){
		return args ->{
			if (roleRepo.findByAuthority("ADMIN").isPresent()){
				return;
			}
			Role adminRole = roleRepo.save(new Role("ADMIN"));
			roleRepo.save(new Role("USER"));
			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);
			//Flock flock = new Flock();
			User admin = new User();
			userRepo.save(admin);
		};
	}
}
