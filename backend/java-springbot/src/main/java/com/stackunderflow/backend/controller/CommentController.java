package com.stackunderflow.backend.controller;

import com.stackunderflow.backend.dto.CommentRequest;
import com.stackunderflow.backend.entity.Comment;
import com.stackunderflow.backend.service.CommentService;
import com.stackunderflow.backend.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    
    private final CommentService commentService;
    private final JwtService jwtService;
    
    @PostMapping
    public ResponseEntity<Comment> createComment(
            @Valid @RequestBody CommentRequest request,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.substring(7));
        return ResponseEntity.ok(commentService.createComment(request, userId));
    }
    
    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Comment>> getCommentsByQuestion(@PathVariable Long questionId) {
        return ResponseEntity.ok(commentService.getCommentsByQuestionId(questionId));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Comment>> getCommentsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(commentService.getCommentsByUserId(userId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest request,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.substring(7));
        return ResponseEntity.ok(commentService.updateComment(id, request, userId));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.substring(7));
        commentService.deleteComment(id, userId);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/vote")
    public ResponseEntity<Comment> voteComment(
            @PathVariable Long id,
            @RequestParam int voteChange,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.substring(7));
        return ResponseEntity.ok(commentService.voteComment(id, voteChange, userId));
    }
}
