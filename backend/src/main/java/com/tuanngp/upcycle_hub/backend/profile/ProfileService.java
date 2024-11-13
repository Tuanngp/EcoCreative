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

    public ProfileResponseDto getProfile(ProfileRequestDto profileRequestDto) {
        ProfileResponseDto response = new ProfileResponseDto();
        try {
            accountRepository.findByUsername(profileRequestDto.getUsername())
                    .ifPresentOrElse(account -> {
                        response.setName(account.getName());
                        response.setEmail(account.getEmail());
                        response.setPhone(account.getPhone());
                        response.setAddress(account.getAddress());
                        response.setDateOfBirth(account.getDateOfBirth());
                        response.setBio(account.getDescription());
                        response.setProfileImage(account.getProfileImage());
                        ResponseUtils.setResponseSuccess(response);
                    }, () -> ResponseUtils.setResponseNoData(response));
        } catch (Exception e) {
            ResponseUtils.setResponseFail(response);
        }
        return response;
    }

    public ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto) {
        ProfileResponseDto response = new ProfileResponseDto();
        try {
            accountRepository.findByUsername(profileRequestDto.getUsername())
                    .ifPresentOrElse(account -> {
                        account.setName(profileRequestDto.getName());
                        account.setAddress(profileRequestDto.getAddress());
                        account.setPhone(profileRequestDto.getPhone());
                        account.setEmail(profileRequestDto.getEmail());
                        account.setDateOfBirth(profileRequestDto.getDateOfBirth());
                        account.setDescription(profileRequestDto.getDescription());
                        accountRepository.save(account);
                        ResponseUtils.setResponseSuccess(response);
                    }, () -> ResponseUtils.setResponseNoData(response));
            ResponseUtils.setResponseSuccess(response);
        } catch (Exception e) {
            ResponseUtils.setResponseFail(response);
        }
        return response;
    }
}
