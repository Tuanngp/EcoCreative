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
@Table(name = "time_zone")
public class TimeZone extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "time_zone_id")
    private Long id;
    @Column(name = "time_zone_name")
    private String name;
    @Column(name = "display_order")
    private Integer displayOrder;
    @Column(name = "use_yn")
    private boolean useYn;
}
