package com.dentbridge.repository;

import com.dentbridge.model.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, Long> {

    List<Treatment> findByPatientId(Long patientId);

    List<Treatment> findByAppointmentId(Long appointmentId);

    @Query("SELECT t FROM Treatment t WHERE t.treatmentDate BETWEEN :startDate AND :endDate")
    List<Treatment> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

}
