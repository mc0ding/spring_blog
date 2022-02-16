package com.hanghae.project01.controller;

import com.hanghae.project01.models.CommentRequestDto;
import com.hanghae.project01.models.CommentResponseDto;
import com.hanghae.project01.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("api/comments/{id}") // 댓글 작성 api
    public CommentResponseDto creatComment(@PathVariable Long id, @RequestBody CommentRequestDto requestDto) {
        return commentService.postComment(id, requestDto);
    }

    @PutMapping("api/comments/{id}") // 댓글 수정 api
    public Long updateComment(@PathVariable Long id, @RequestBody CommentRequestDto requestDto) {
        commentService.updateComment(id, requestDto);
        return id;
    }

    @DeleteMapping("api/comments/{id}") // 댓글 삭제 api
    public Long deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return id;
    }

}
