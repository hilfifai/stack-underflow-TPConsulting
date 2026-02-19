package com.stackunderflow.backend.service;

import com.stackunderflow.backend.dto.QuestionRequest;
import com.stackunderflow.backend.entity.Question;
import com.stackunderflow.backend.entity.QuestionStatus;
import com.stackunderflow.backend.entity.User;
import com.stackunderflow.backend.repository.QuestionRepository;
import com.stackunderflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public Question createQuestion(QuestionRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Question question = Question.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .user(user)
                .status(QuestionStatus.OPEN)
                .viewCount(0)
                .voteCount(0)
                .build();
        
        return questionRepository.save(question);
    }
    
    public Question getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        question.setViewCount(question.getViewCount() + 1);
        return questionRepository.save(question);
    }
    
    public Page<Question> getAllQuestions(Pageable pageable) {
        return questionRepository.findAll(pageable);
    }
    
    public Page<Question> getQuestionsByStatus(QuestionStatus status, Pageable pageable) {
        return questionRepository.findByStatus(status, pageable);
    }
    
    public Page<Question> searchQuestions(String keyword, Pageable pageable) {
        return questionRepository.searchByKeyword(keyword, pageable);
    }
    
    public List<Question> getRecentQuestions(int limit) {
        return questionRepository.findRecentQuestions(Pageable.ofSize(limit));
    }
    
    public List<Question> getMostViewedQuestions(int limit) {
        return questionRepository.findMostViewedQuestions(Pageable.ofSize(limit));
    }
    
    public Page<Question> getQuestionsByUser(Long userId, Pageable pageable) {
        return questionRepository.findByUserId(userId, pageable);
    }
    
    @Transactional
    public Question updateQuestion(Long id, QuestionRequest request, Long userId) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        if (!question.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this question");
        }
        
        question.setTitle(request.getTitle());
        question.setContent(request.getContent());
        
        return questionRepository.save(question);
    }
    
    @Transactional
    public void deleteQuestion(Long id, Long userId) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        if (!question.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this question");
        }
        
        questionRepository.delete(question);
    }
    
    @Transactional
    public Question voteQuestion(Long id, int voteChange, Long userId) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        question.setVoteCount(question.getVoteCount() + voteChange);
        return questionRepository.save(question);
    }
    
    @Transactional
    public Question updateQuestionStatus(Long id, QuestionStatus status, Long userId) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        if (!question.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this question");
        }
        
        question.setStatus(status);
        return questionRepository.save(question);
    }
}
