package com.hanghae.project01.controller;

import com.hanghae.project01.models.*;
import com.hanghae.project01.service.PostServiece;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostServiece postServiece;

    @GetMapping("api/posts-list")
    public List<PostResponseDto> listingPost(){
        return postServiece.listingPost();
    }

    @PostMapping("api/posts") // 게시글 작성 api
    public PostResponseDto creatPost(@RequestBody PostRequestDto requestDto) {
        return postServiece.creatPost(requestDto);
    }
    @GetMapping("api/posts/{id}") // 게시글 조회 api (댓글 목록 조회 포함)
    public PostResponseDto readPost(@PathVariable Long id) {
        return postServiece.readPost(id);
    }

    @PutMapping("api/posts/{id}") // 게시글 수정 api
    public Long updatePost(@PathVariable Long id, @RequestBody PostRequestDto requestDto) {
        postServiece.updatePost(id, requestDto);
        return id;
    }

    @DeleteMapping("api/posts/{id}") // 게시글 삭제 api
    public Long deletePost(@PathVariable Long id) {
        postServiece.deletePost(id);
        return id;
    }

}

//    public List<PostResponseDto> listPost() {
//        List<Post> postList = postRepository.findAllByOrderByCreatedAtDesc();
//        List<PostResponseDto> responseDto = new ArrayList<>();
//        for (Post p : postList) {
//            responseDto.add(new PostResponseDto(p));
//        }
//        return responseDto;
//    }
//    public Post creatPost(@RequestBody PostRequestDto requestDto) {
//        Post post = new Post(requestDto);
//        return postRepository.save(post);
//    }
//    public PostResponseDto readPost(@PathVariable Long id) {
//        Post post = postRepository.findById(id).orElseThrow(
//                () -> new NullPointerException("게시글이 존재하지 않습니다.")
//        );
//        PostResponseDto responseDto = new PostResponseDto(post);
//        return responseDto;
//    }
//    public Long deletePost(@PathVariable Long id) {
//        postRepository.deleteById(id);
//        return id;
//    }