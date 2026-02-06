package com.example.Backend.controller;

import com.example.Backend.model.BloodRequest;
import com.example.Backend.service.BloodRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {
    @Autowired
    private BloodRequestService requestService;

    @PostMapping
    public BloodRequest createRequest(@RequestBody BloodRequest request) {
        return requestService.createRequest(request);
    }

    @GetMapping
    public List<BloodRequest> getAllRequests() {
        return requestService.getAllRequests();
    }

    @PutMapping("/{id}/status")
    public BloodRequest updateStatus(@PathVariable Long id, @RequestBody String status) {
        return requestService.updateStatus(id, status);
    }
}
