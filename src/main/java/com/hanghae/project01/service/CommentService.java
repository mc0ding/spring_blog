package com.hanghae.project01.service;

import com.hanghae.project01.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService{
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentResponseDto postComment(Long id, CommentRequestDto requestDto) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new NullPointerException("게시물이 존재하지 않습니다.")
        );
        Comment comment = new Comment(requestDto);
        comment.changePost(post);
        return new CommentResponseDto(commentRepository.save(comment));
    }

    @Transactional
    public Long updateComment(Long id, CommentRequestDto requestDto) {
        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new NullPointerException("게시물이 존재하지 않습니다.")
        );
        comment.updateComment(requestDto);
        return id;
    }

    public Long deleteComment(Long id) {
        commentRepository.deleteById(id);
        return id;
    }
}
