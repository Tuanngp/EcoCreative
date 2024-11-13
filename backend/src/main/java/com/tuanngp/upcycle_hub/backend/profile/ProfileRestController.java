package com.tuanngp.upcycle_hub.backend.profile;

import com.tuanngp.upcycle_hub.backend.profile.dto.ProfileRequestDto;
import com.tuanngp.upcycle_hub.backend.profile.dto.ProfileResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class ProfileRestController {
    private final ProfileService profileService;

    @GetMapping("/getProfile")
    public ResponseEntity<ProfileResponseDto> getProfile(ProfileRequestDto profileRequestDto) {
        return ResponseEntity.ok(profileService.getProfile(profileRequestDto));
    }

    @PutMapping("/updateProfile")
    public ResponseEntity<ProfileResponseDto> updateProfile(ProfileRequestDto profileRequestDto) {
        return ResponseEntity.ok(profileService.updateProfile(profileRequestDto));
    }   
}
