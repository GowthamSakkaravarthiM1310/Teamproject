package com.example.Backend.DonorModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "http://localhost:5173")
public class DonorController {

    @Autowired
    private DonorRepository donorRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerDonor(@RequestBody DonorModel donor) {
        donorRepository.save(donor);
        return ResponseEntity.ok("Donor registered successfully");
    }
}
