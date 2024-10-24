package com.tuanngp.upcycle_hub.common.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CloudinaryUtils {
    private static Cloudinary cloudinary;

    public static String uploadImage(MultipartFile file, String directoryName) {
        try{
            Map<String, String> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "eco_creative/"+directoryName,
                    "use_filename", true,
                    "unique_filename", true,
                    "resource_type","image"
            ));
            return result.get("secure_url");
        }catch (IOException io){
            throw new RuntimeException("Image upload fail");
        }
    }

    public static Boolean destroyImage(String nameOfImage, String directoryName){
        try {
            cloudinary.uploader().destroy(nameOfImage, ObjectUtils.asMap(
                    "folder", "eco_creative/" + directoryName,
                    "resource_type", "image"
            ));
        }catch (IOException io){
            throw new RuntimeException("Image destroy fail");
        }
        return true;
    }
}