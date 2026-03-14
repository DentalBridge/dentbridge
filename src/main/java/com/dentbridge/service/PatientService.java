package com.dentbridge.service;

import com.dentbridge.dto.PatientRequest;
import com.dentbridge.dto.PatientResponse;
import com.dentbridge.model.Patient;
import com.dentbridge.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    @Transactional(readOnly = true)
    public Page<PatientResponse> getAllPatients(Pageable pageable) {
        return patientRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public Page<PatientResponse> searchPatients(String search, Pageable pageable) {
        return patientRepository.searchPatients(search, pageable)
                .map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public PatientResponse getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
        return mapToResponse(patient);
    }

    @Transactional
    public PatientResponse createPatient(PatientRequest request) {
        Patient patient = Patient.builder()
                .name(request.getName())
                .gender(request.getGender())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .dateOfBirth(request.getDateOfBirth())
                .medicalHistory(request.getMedicalHistory())
                .allergies(request.getAllergies())
                .build();

        Patient savedPatient = patientRepository.save(patient);
        return mapToResponse(savedPatient);
    }

    @Transactional
    public PatientResponse updatePatient(Long id, PatientRequest request) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        patient.setName(request.getName());
        patient.setGender(request.getGender());
        patient.setEmail(request.getEmail());
        patient.setPhone(request.getPhone());
        patient.setAddress(request.getAddress());
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setMedicalHistory(request.getMedicalHistory());
        patient.setAllergies(request.getAllergies());

        Patient updatedPatient = patientRepository.save(patient);
        return mapToResponse(updatedPatient);
    }

    @Transactional
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }

    private PatientResponse mapToResponse(Patient patient) {
        return PatientResponse.builder()
                .id(patient.getId())
                .name(patient.getName())
                .gender(patient.getGender())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .address(patient.getAddress())
                .dateOfBirth(patient.getDateOfBirth())
                .medicalHistory(patient.getMedicalHistory())
                .allergies(patient.getAllergies())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }

}
