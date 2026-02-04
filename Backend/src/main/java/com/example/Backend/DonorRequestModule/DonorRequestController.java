package com.example.Backend.DonorRequestModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class DonorRequestController {

    @Autowired
    private DonorRequestRepository requestRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitRequest(@RequestBody DonorRequestModel request) {
        if (request.getRequestDate() == null) {
            request.setRequestDate(LocalDate.now());
        }
        request.setStatus("PENDING");
        requestRepository.save(request);
        return ResponseEntity.ok("Request submitted successfully");
    }
}
