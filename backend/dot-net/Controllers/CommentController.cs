using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/comments")]
public class CommentController : ControllerBase
{
    private readonly CommentService _commentService;

    public CommentController(CommentService commentService)
    {
        _commentService = commentService;
    }

    private string? GetUserId() => User.FindFirstValue("userId");
    private string? GetUsername() => User.FindFirstValue("username");

    [HttpPost]
    [Authorize]
    public IActionResult Create([FromBody] CommentCreateRequest request)
    {
        var comment = _commentService.Create(
            request.Content, request.QuestionId,
            GetUserId()!, GetUsername()!
        );
        return CreatedAtAction(nameof(Create), 
            new { success = true, message = "Comment created successfully", data = comment });
    }

    [HttpGet("question/{questionId}")]
    public IActionResult GetByQuestionId(string questionId)
    {
        var comments = _commentService.GetByQuestionId(questionId);
        return Ok(new { success = true, message = "Success get comments", data = comments });
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete(string id)
    {
        _commentService.Delete(id);
        return Ok(new { success = true, message = "Comment deleted successfully" });
    }
}
