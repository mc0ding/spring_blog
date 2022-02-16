package com.hanghae.project01.service;

import com.hanghae.project01.models.Post;
import com.hanghae.project01.models.PostRepository;
import com.hanghae.project01.models.PostRequestDto;
import com.hanghae.project01.models.PostResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiece {

    private final PostRepository postRepository;

    public List<PostResponseDto> listingPost() {
        List<Post> postList = postRepository.findAllByOrderByCreatedAtDesc();
        List<PostResponseDto> responseDto = new ArrayList<>();
        for (Post p : postList) {
            responseDto.add(new PostResponseDto(p));
        }
        return responseDto;
    }

    public PostResponseDto creatPost(@RequestBody PostRequestDto requestDto) {
        Post post = new Post(requestDto);
        return new PostResponseDto(postRepository.save(post));
    }

    public PostResponseDto readPost(@PathVariable Long id) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new NullPointerException("게시글이 존재하지 않습니다.")
        );
        PostResponseDto responseDto = new PostResponseDto(post);
        return responseDto;
    }

    @Transactional
    public Long updatePost(Long id, PostRequestDto requestDto) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new NullPointerException("게시물이 존재하지 않습니다.")
        );
        post.updatePost(requestDto);
        return id;
    }

    public Long deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return id;
    }
}
