package com.example.connection.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberSessionDTO {
    private long memberNumber;
    private String memberEmail;
    private String memberPassword;
    private String memberNickname;
}
