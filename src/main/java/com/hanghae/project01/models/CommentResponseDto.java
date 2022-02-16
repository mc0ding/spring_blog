package com.hanghae.project01.models;

import lombok.Getter;

@Getter
public class CommentResponseDto {
    private final Long id;
    private final String content;

    public CommentResponseDto(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getCommentContents();
    }

}
