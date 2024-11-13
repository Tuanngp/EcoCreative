package com.tuanngp.upcycle_hub.common.repositories;

import com.tuanngp.upcycle_hub.common.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LanguageRepository extends JpaRepository<Language, String> {
    Optional<Language> findByLangCode(String langCode);

}
