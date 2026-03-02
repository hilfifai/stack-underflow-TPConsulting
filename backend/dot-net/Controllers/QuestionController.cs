using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/questions")]
public class QuestionController : ControllerBase
{
    private readonly QuestionService _questionService;

    public QuestionController(QuestionService questionService)
    {
        _questionService = questionService;
    }

    private string? GetUserId() => User.FindFirstValue("userId");
    private string? GetUsername() => User.FindFirstValue("username");

    [HttpPost]
    [Authorize]
    public IActionResult Create([FromBody] QuestionCreateRequest request)
    {
        var question = _questionService.Create(
            request.Title, request.Description, request.Status,
            GetUserId()!, GetUsername()!
        );
        return CreatedAtAction(nameof(GetById), new { id = question.Id }, 
            new { success = true, message = "Question created successfully", data = question });
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var questions = _questionService.GetAll();
        return Ok(new { success = true, message = "Success get all questions", data = questions });
    }

    [HttpGet("paginated")]
    public IActionResult GetPaginated([FromQuery] int page = 1, [FromQuery] int limit = 10)
    {
        var (questions, total, pageResult, limitResult, totalPages) = _questionService.GetPaginated(page, limit);
        return Ok(new { success = true, message = "Success get questions", 
            data = new { questions, total, page = pageResult, limit = limitResult, totalPages } });
    }

    [HttpGet("search")]
    public IActionResult Search([FromQuery] string q)
    {
        var questions = _questionService.Search(q);
        return Ok(new { success = true, message = "Success search questions", data = questions });
    }

    [HttpGet("hot")]
    public IActionResult GetHot([FromQuery] int limit = 5)
    {
        var questions = _questionService.GetHot(limit);
        return Ok(new { success = true, message = "Success get hot questions", data = questions });
    }

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var question = _questionService.GetById(id);
        return Ok(new { success = true, message = "Success get question", data = question });
    }

    [HttpGet("{id}/related")]
    public IActionResult GetRelated(string id, [FromQuery] int limit = 5)
    {
        var questions = _questionService.GetRelated(id, limit);
        return Ok(new { success = true, message = "Success get related questions", data = questions });
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult Update(string id, [FromBody] QuestionUpdateRequest request)
    {
        var question = _questionService.Update(
            id, request.Title, request.Description, request.Status,
            GetUserId()!
        );
        return Ok(new { success = true, message = "Question updated successfully", data = question });
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete(string id)
    {
        _questionService.Delete(id, GetUserId()!);
        return Ok(new { success = true, message = "Question deleted successfully" });
    }
}
