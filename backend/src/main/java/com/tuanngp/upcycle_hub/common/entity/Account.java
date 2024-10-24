package com.tuanngp.upcycle_hub.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "account")
public class Account extends BaseEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "username", nullable = false)
    private String username;
    @Column(name = "password", nullable = false)
    @JsonIgnore
    private String password;
    @Column(name = "name")
    private String name;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "address")
    private String address;
    @Column(name = "date_of_birth")
    private Date dateOfBirth;
    @Column(name = "description")
    private String description;
    @Column(name = "profile_image")
    private String profileImage;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
    @Column(name = "use_yn")
    private boolean useYn;
    @Column(name = "delete_yn")
    private boolean deleteYn;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("ROLE_"+getRole().getName().toUpperCase()));
        return authorityList;
    }
}
