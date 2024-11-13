package com.tuanngp.upcycle_hub.common.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "translation")
public class Translation extends BaseEntity{
    @Id
    @Column(name = "langCode_id")
    private String langCode;
    @Column(name = "translation_key")
    private String translationKey;
    @Column(name = "translation_value")
    private String translationValue;
}
