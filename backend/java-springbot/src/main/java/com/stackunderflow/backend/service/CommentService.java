package com.stackunderflow.backend.service;

import com.stackunderflow.backend.dto.CommentRequest;
import com.stackunderflow.backend.entity.Comment;
import com.stackunderflow.backend.entity.Question;
import com.stackunderflow.backend.entity.User;
import com.stackunderflow.backend.repository.CommentRepository;
import com.stackunderflow.backend.repository.QuestionRepository;
import com.stackunderflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    
    private final CommentRepository commentRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public Comment createComment(CommentRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        Comment comment = Comment.builder()
                .content(request.getContent())
                .user(user)
                .question(question)
                .voteCount(0)
                .build();
        
        return commentRepository.save(comment);
    }
    
    public List<Comment> getCommentsByQuestionId(Long questionId) {
        return commentRepository.findByQuestionId(questionId);
    }
    
    public List<Comment> getCommentsByUserId(Long userId) {
        return commentRepository.findByUserId(userId);
    }
    
    @Transactional
    public Comment updateComment(Long id, CommentRequest request, Long userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this comment");
        }
        
        comment.setContent(request.getContent());
        return commentRepository.save(comment);
    }
    
    @Transactional
    public void deleteComment(Long id, Long userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this comment");
        }
        
        commentRepository.delete(comment);
    }
    
    @Transactional
    public Comment voteComment(Long id, int voteChange, Long userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        comment.setVoteCount(comment.getVoteCount() + voteChange);
        return commentRepository.save(comment);
    }
}
