package com.dentbridge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponse {

    private Long id;
    private String name;
    private String gender;
    private String email;
    private String phone;
    private String address;
    private LocalDate dateOfBirth;
    private String medicalHistory;
    private String allergies;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
