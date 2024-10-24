package com.tuanngp.upcycle_hub.backend.authentication;

import com.tuanngp.upcycle_hub.backend.authentication.dto.UserDto;
import com.tuanngp.upcycle_hub.common.entity.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    UserDto toDto(Account account);
}
