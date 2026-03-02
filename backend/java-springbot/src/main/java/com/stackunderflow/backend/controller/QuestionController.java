package com.stackunderflow.backend.controller;

import com.stackunderflow.backend.dto.QuestionRequest;
import com.stackunderflow.backend.entity.Question;
import com.stackunderflow.backend.entity.QuestionStatus;
import com.stackunderflow.backend.service.QuestionService;
import com.stackunderflow.backend.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {
    
    private final QuestionService questionService;
    private final JwtService jwtService;
    
    @PostMapping
    public ResponseEntity<Question> createQuestion(
            @Valid @RequestBody QuestionRequest request,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.substring(7));
        return ResponseEntity.ok(questionService.createQuestion(request, userId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }
    
    @GetMapping
    public ResponseEntity<Page<Question>> getAllQuestions(
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(questionService.getAllQuestions(pageable));
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<Question>> searchQuestions(
            @RequestParam String keyword,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(questionService.searchQuestions(keyword, pageable));
    }
    
    @GetMapping("/recent")
    public ResponseEntity<List<Question>> getRecentQuestions(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(questionService.getRecentQuestions(limit));
    }
    
    @GetMapping("/popular")
    public ResponseEntity<List<Question>> getMostViewedQuestions(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(questionService.getMostViewedQuestions(limit));
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<Question>> getQuestionsByStatus(
            @PathVariable QuestionStatus status,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(questionService.getQuestionsByStatus(status, pageable));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Question>> getQuestionsByUser(
            @PathVariable Long userId,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(questionService.getQuestionsByUser(userId, pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionRequest request,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.substring(7));
        return ResponseEntity.ok(questionService.updateQuestion(id, request, userId));
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<Question> updateQuestionStatus(
            @PathVariable Long id,
            @RequestParam QuestionStatus status,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.substring(7));
        return ResponseEntity.ok(questionService.updateQuestionStatus(id, status, userId));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.substring(7));
        questionService.deleteQuestion(id, userId);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/vote")
    public ResponseEntity<Question> voteQuestion(
            @PathVariable Long id,
            @RequestParam int voteChange,
            @RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader.substring(7));
        return ResponseEntity.ok(questionService.voteQuestion(id, voteChange, userId));
    }
}
