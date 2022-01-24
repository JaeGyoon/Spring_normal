package com.Sparta.HangHaeBlog.Models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor // 기본생성자를 만듭니다.
@Getter
@Entity // 테이블과 연계됨을 스프링에게 알려줍니다.
public class Memo extends Timestamped { // 생성,수정 시간을 자동으로 만들어줍니다.
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String postName;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String postText;

    public Memo(String postName, String userName, String postText) {
        this.postName = postName;
        this.userName = userName;
        this.postText = postText;
    }

    public Memo(MemoRequestDTO requestDto)
    {
        this.postName = requestDto.getPostName();
        this.userName = requestDto.getUserName();
        this.postText = requestDto.getPostText();
    }

    public void update(MemoRequestDTO requestDto)
    {
        this.postName = requestDto.getPostName();
        this.userName = requestDto.getUserName();
        this.postText = requestDto.getPostText();
    }
}