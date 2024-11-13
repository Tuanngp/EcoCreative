package com.tuanngp.upcycle_hub.common.utils;

import ch.qos.logback.core.util.StringUtil;
import com.cloudinary.utils.StringUtils;

public class SearchUtils {
    public static String searchLike(String search) {
        return StringUtils.isBlank(search) ? "" : search.trim().replaceAll("%", "\\\\%").replaceAll("_", "\\\\_");
    }
}
