package com.tuanngp.upcycle_hub.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "language")
public class Language extends BaseEntity{
    @Id
    @Column(name = "lang_code")
    private String langCode;

    @Column(name = "lang_name")
    private String langName;
}
