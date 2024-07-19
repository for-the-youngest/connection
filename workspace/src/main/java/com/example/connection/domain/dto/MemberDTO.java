package com.example.connection.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberDTO {
    private long memberNumber;
    private String memberName;
    private String memberNickname;
    private String memberEmail;
    private String memberPassword;
    private String memberGender;
    private String memberYear;
    private String memberMonth;
    private String memberDay;
}
