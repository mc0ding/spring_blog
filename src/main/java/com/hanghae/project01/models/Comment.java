package com.hanghae.project01.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Comment extends Timestamped{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String commentContents;

    @ManyToOne
    @JoinColumn(name = "POST_Id")
    private Post post;

    public void changePost(Post post) {
        this.post = post;
        post.getComments().add(this);
    }

    public Comment(CommentRequestDto requestDto) {
        this.commentContents = requestDto.getCommentContents();
    }

    public void updateComment(CommentRequestDto requestDto) {
        this.commentContents = requestDto.getCommentContents();
    }

}
