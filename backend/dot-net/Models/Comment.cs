using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Comment
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    [Required]
    public string Content { get; set; } = string.Empty;
    
    [Required]
    public string QuestionId { get; set; } = string.Empty;
    
    [ForeignKey("QuestionId")]
    public Question? Question { get; set; }
    
    [Required]
    public string UserId { get; set; } = string.Empty;
    
    [ForeignKey("UserId")]
    public User? User { get; set; }
    
    [MaxLength(50)]
    public string Username { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
