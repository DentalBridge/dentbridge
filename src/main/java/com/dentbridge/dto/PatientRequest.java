package com.dentbridge.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Gender is required")
    private String gender;

    @Email(message = "Email should be valid")
    private String email;

    private String phone;
    private String address;
    private LocalDate dateOfBirth;
    private String medicalHistory;
    private String allergies;

}
