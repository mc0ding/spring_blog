package com.hanghae.project01.models;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class PostResponseDto {
    private Long id;
    private String username;
    private String title;
    private String contents;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<CommentResponseDto> comments = new ArrayList<>();

    public PostResponseDto(Post post) {
        this.id = post.getId();
        this.createdAt = post.getCreatedAt();
        this.modifiedAt = post.getModifiedAt();
        this.username = post.getUsername();
        this.title = post.getTitle();
        this.contents = post.getContents();
        for (Comment comment : post.getComments())
            comments.add(new CommentResponseDto(comment));
    }
}
