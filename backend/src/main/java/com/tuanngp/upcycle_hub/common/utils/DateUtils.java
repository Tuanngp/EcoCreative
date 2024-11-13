package com.tuanngp.upcycle_hub.common.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {
    public static final String yyyyMMdd = "yyyyMMdd";
    public static final String yyyyMMdd_HYPHEN = "yyyy-MM-dd";
    public static final String HHMMSS = "hh:mm:ss";
    public static final String YYYYMMDDHHMMSS = "yyyyMMddhhmmss";

    public static String convertDateToString(Date date, String... format) {
        SimpleDateFormat simpleDateFormat;
        if (format.length == 0) {
            simpleDateFormat = new SimpleDateFormat(yyyyMMdd);
        } else {
            simpleDateFormat = new SimpleDateFormat(format[0]);
        }
        return simpleDateFormat.format(date);
    }

}
