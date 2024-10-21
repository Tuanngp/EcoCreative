//package com.tuanngp.upcycle_hub.docker;
//
//import com.github.dockerjava.api.DockerClient;
//import com.github.dockerjava.api.command.CreateContainerResponse;
//import com.github.dockerjava.api.command.InspectContainerResponse;
//import com.github.dockerjava.api.model.Container;
//import com.github.dockerjava.core.DockerClientBuilder;
//import jakarta.annotation.PostConstruct;
//import org.springframework.context.annotation.Bean;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class DockerService {
//    private DockerClient dockerClient;
//
//    @PostConstruct
//    public void init() {
//        dockerClient = DockerClientBuilder.getInstance().build();
//    }
//
//    public boolean isContainerRunning(String containerName) {
//        List<Container> containers = dockerClient.listContainersCmd().withShowAll(true).exec();
//        for (Container container : containers) {
//            if (container.getNames()[0].equals("/" + containerName)) {
//                InspectContainerResponse containerResponse = dockerClient.inspectContainerCmd(container.getId()).exec();
//                InspectContainerResponse.ContainerState state = containerResponse.getState();
//                return Boolean.TRUE.equals(state.getRunning());
//            }
//        }
//        return false;
//    }
//
//    public void startContainer(String imageName, String containerName) {
//        boolean running = isContainerRunning(containerName);
//        if (!running) {
//            CreateContainerResponse container = dockerClient.createContainerCmd(imageName)
//                    .withName(containerName)
//                    .exec();
//            dockerClient.startContainerCmd(container.getId()).exec();
//            System.out.println("Container started: " + containerName);
//        } else {
//            System.out.println("Container is already running: " + containerName);
//        }
//    }
//}
