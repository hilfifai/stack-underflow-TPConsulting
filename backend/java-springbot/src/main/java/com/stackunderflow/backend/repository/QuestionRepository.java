package com.stackunderflow.backend.repository;

import com.stackunderflow.backend.entity.Question;
import com.stackunderflow.backend.entity.QuestionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    Page<Question> findByStatus(QuestionStatus status, Pageable pageable);
    
    Page<Question> findByUserId(Long userId, Pageable pageable);
    
    @Query("SELECT q FROM Question q WHERE q.title LIKE %:keyword% OR q.content LIKE %:keyword%")
    Page<Question> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT q FROM Question q ORDER BY q.createdAt DESC")
    List<Question> findRecentQuestions(Pageable pageable);
    
    @Query("SELECT q FROM Question q ORDER BY q.viewCount DESC")
    List<Question> findMostViewedQuestions(Pageable pageable);
}
