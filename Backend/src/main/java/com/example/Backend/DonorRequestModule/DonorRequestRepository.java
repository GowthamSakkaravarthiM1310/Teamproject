package com.example.Backend.DonorRequestModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonorRequestRepository extends JpaRepository<DonorRequestModel, Long> {
}
