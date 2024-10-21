//package com.tuanngp.upcycle_hub.docker;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DockerRunner implements CommandLineRunner {
//    private final DockerService dockerService;
//
//    public DockerRunner(DockerService dockerService) {
//        this.dockerService = dockerService;
//    }
//
//    @Override
//    public void run(String... args) {
//        // Tên container và image cần kiểm tra
//        String containerName = "postgres";
//        String imageName = "postgres:latest";
//
//        // Kiểm tra và khởi động container nếu cần
//        dockerService.startContainer(imageName, containerName);
//    }
//}
