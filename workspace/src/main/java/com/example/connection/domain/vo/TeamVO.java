package com.example.connection.domain.vo;

import lombok.Data;

@Data
public class TeamVO {
    private long teamNumber;
    private String teamCategorySports;
    private String teamName;
    private String teamManager;
    private Number teamPersons;
    private String teamFields;
    private Number teamRank;
    private long tournamentNumber;
    private long managerNumber;
}
