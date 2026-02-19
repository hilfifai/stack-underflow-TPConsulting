package com.stackunderflow.backend.repository;

import com.stackunderflow.backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    List<Comment> findByQuestionId(Long questionId);
    
    List<Comment> findByUserId(Long userId);
}
