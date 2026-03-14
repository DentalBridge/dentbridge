package com.dentbridge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DentBridgeApplication {

    public static void main(String[] args) {
        SpringApplication.run(DentBridgeApplication.class, args);
    }

}
