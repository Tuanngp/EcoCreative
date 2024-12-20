package com.tuanngp.upcycle_hub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class UpcycleHubApplication {

	public static void main(String[] args) {
		SpringApplication.run(UpcycleHubApplication.class, args);
	}

}
