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
public class LeagueUpdateDTO {
    private Long leagueNumber;
    private String leagueTitle;
    private String leagueContent;
    private LocalDateTime leagueDate;
}
