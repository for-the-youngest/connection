package com.example.connection.domain.vo;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberVO {
    private long memberNumber;
    private String memberName;
    private String memberEmail;
    private String memberPassword;
    private char memberGender;
    private String memberYear;
    private String memberMonth;
    private String memberDay;
    private String memberNickname;
}
