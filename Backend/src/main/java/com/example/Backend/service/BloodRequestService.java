package com.example.Backend.service;

import com.example.Backend.model.BloodRequest;
import com.example.Backend.repository.BloodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BloodRequestService {
    @Autowired
    private BloodRequestRepository requestRepository;

    public BloodRequest createRequest(BloodRequest request) {
        return requestRepository.save(request);
    }

    public List<BloodRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public BloodRequest updateStatus(Long id, String status) {
        BloodRequest request = requestRepository.findById(id).orElseThrow();
        request.setStatus(status);
        return requestRepository.save(request);
    }
}
