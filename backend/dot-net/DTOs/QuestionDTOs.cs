using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs;

public class QuestionCreateRequest
{
    [Required]
    [MinLength(5)]
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [MinLength(10)]
    public string Description { get; set; } = string.Empty;
    
    public QuestionStatus Status { get; set; } = QuestionStatus.Open;
}

public class QuestionUpdateRequest
{
    [Required]
    [MinLength(5)]
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [MinLength(10)]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    public QuestionStatus Status { get; set; }
}

public class QuestionResponse
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public QuestionStatus Status { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<CommentResponse> Comments { get; set; } = new();
}

public class PaginatedQuestionsResponse
{
    public List<QuestionResponse> Questions { get; set; } = new();
    public int Total { get; set; }
    public int Page { get; set; }
    public int Limit { get; set; }
    public int TotalPages { get; set; }
}
