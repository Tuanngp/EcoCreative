package com.tuanngp.upcycle_hub.backend.profile;

import com.tuanngp.upcycle_hub.backend.profile.dto.ProfileRequestDto;
import com.tuanngp.upcycle_hub.backend.profile.dto.ProfileResponseDto;
import com.tuanngp.upcycle_hub.common.repositories.AccountRepository;
import com.tuanngp.upcycle_hub.common.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final AccountRepository accountRepository;

    public ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto) {
        ProfileResponseDto response = new ProfileResponseDto();
        try {
            accountRepository.findByUsername(profileRequestDto.getUsername())
                    .ifPresent(account -> {
                        account.setName(profileRequestDto.getName());
                        account.setAddress(profileRequestDto.getAddress());
                        account.setPhone(profileRequestDto.getPhone());
                        account.setEmail(profileRequestDto.getEmail());
                        account.setDateOfBirth(profileRequestDto.getDateOfBirth());
                        account.setDescription(profileRequestDto.getDescription());
                        account.setProfileImage(profileRequestDto.getProfileImage());
                        accountRepository.save(account);
                        ResponseUtils.setResponseSuccess(response);
                    });
            ResponseUtils.setResponseSuccess(response);
        } catch (Exception e) {
            ResponseUtils.setResponseFail(response);
        }
        return response;
    }
}
