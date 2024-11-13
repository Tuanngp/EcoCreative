package com.tuanngp.upcycle_hub.common.service;

import com.tuanngp.upcycle_hub.common.entity.Language;
import com.tuanngp.upcycle_hub.common.entity.Translation;
import com.tuanngp.upcycle_hub.common.repositories.LanguageRepository;
import com.tuanngp.upcycle_hub.common.repositories.TranslationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TranslateService {
    private final TranslationRepository translationRepository;
    public String translate(String translateKey, String langCode) {
        return translationRepository.findByTranslationKeyAndLangCode(translateKey, langCode)
                .map(Translation::getTranslationValue)
                .orElse(translateKey);
    }
}
