package com.example.connection.domain.dto.page;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class Criteria {
    private int page;
    private int amount;

    public Criteria(){
        this(1,4);
    }

    public Criteria(int page, int amount){
        this.page = page;
        this.amount = amount;
    }
}
