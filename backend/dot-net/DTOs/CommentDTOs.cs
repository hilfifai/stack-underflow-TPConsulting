using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class CommentCreateRequest
{
    [Required]
    public string Content { get; set; } = string.Empty;
    
    [Required]
    public string QuestionId { get; set; } = string.Empty;
}

public class CommentResponse
{
    public string Id { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string QuestionId { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
