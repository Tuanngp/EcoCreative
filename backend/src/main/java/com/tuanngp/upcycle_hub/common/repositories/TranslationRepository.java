package com.tuanngp.upcycle_hub.common.repositories;

import com.tuanngp.upcycle_hub.common.entity.Translation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TranslationRepository extends JpaRepository<Translation, String> {
    Optional<Translation> findByTranslationKeyAndLangCode(String translationKey, String langCode);
}
