package com.chickenProject.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

// Bean config file
@Configuration

// Lets your project know where to scan for your Repo's
@EnableJpaRepositories(basePackages="com.chickenProject.repo")

// Lets your project know where to scan for your Entities (Objects)
@EntityScan(basePackages="com.chickenProject.entity")

public class ApplicationConfig {

}