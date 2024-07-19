package com.example.connection.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class LeagueListDTO {
    private Long leaguepostNumber;
    private String leaguepostTitle;
    private LocalDateTime leaguepostDate;
    private String memberNickname;
    private String leaguepostCategory;
}
