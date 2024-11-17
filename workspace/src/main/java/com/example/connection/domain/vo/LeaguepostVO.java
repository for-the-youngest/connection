package com.example.connection.domain.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LeaguepostVO {
    private long leaguepostNumber;
    private String leaguepostTitle;
    private String leaguepostContent;
    private LocalDateTime leaguepostDate;
    private String leaguepostCategory;
    private long memberNumber;
}
