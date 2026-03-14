package com.dentbridge.controller;

import com.dentbridge.dto.ApiResponse;
import com.dentbridge.dto.TreatmentRequest;
import com.dentbridge.dto.TreatmentResponse;
import com.dentbridge.security.UserPrincipal;
import com.dentbridge.service.TreatmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/treatments")
@RequiredArgsConstructor
public class TreatmentController {

    private final TreatmentService treatmentService;

    @GetMapping
    public ResponseEntity<List<TreatmentResponse>> getAllTreatments() {
        return ResponseEntity.ok(treatmentService.getAllTreatments());
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<TreatmentResponse>> getTreatmentsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(treatmentService.getTreatmentsByPatient(patientId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TreatmentResponse> getTreatmentById(@PathVariable Long id) {
        return ResponseEntity.ok(treatmentService.getTreatmentById(id));
    }

    @PostMapping
    public ResponseEntity<TreatmentResponse> createTreatment(
            @Valid @RequestBody TreatmentRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser
    ) {
        return ResponseEntity.ok(treatmentService.createTreatment(request, currentUser.getId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TreatmentResponse> updateTreatment(
            @PathVariable Long id,
            @Valid @RequestBody TreatmentRequest request
    ) {
        return ResponseEntity.ok(treatmentService.updateTreatment(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTreatment(@PathVariable Long id) {
        treatmentService.deleteTreatment(id);
        return ResponseEntity.ok(ApiResponse.success("Treatment deleted successfully"));
    }

}
