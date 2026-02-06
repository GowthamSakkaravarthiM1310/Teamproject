package com.example.Backend.service;

import com.example.Backend.model.Donor;
import com.example.Backend.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DonorService {
    @Autowired
    private DonorRepository donorRepository;

    public Donor addDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }
}
