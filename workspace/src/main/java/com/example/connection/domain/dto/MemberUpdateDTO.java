package com.example.connection.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberUpdateDTO {
    private long memberNumber;
    private String memberName;
    private String memberNickname;
    private String memberGender;
    private String memberYear;
    private String memberMonth;
    private String memberDay;
}
