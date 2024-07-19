package com.example.connection.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.IOException;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FileDTO {
    private Long fileNumber;
    private String fileUser;
    private String fileServer;
    private String fileExt;
    private Long freeboardNumber;
}
