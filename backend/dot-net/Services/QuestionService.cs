using backend.Repositories;
using backend.Models;

namespace backend.Services;

public class QuestionService
{
    private readonly QuestionRepository _questionRepository;

    public QuestionService(QuestionRepository questionRepository)
    {
        _questionRepository = questionRepository;
    }

    public Question Create(string title, string description, QuestionStatus status, string userId, string username)
    {
        var question = new Question
        {
            Title = title,
            Description = description,
            Status = status,
            UserId = userId,
            Username = username
        };
        return _questionRepository.Create(question);
    }

    public List<Question> GetAll()
    {
        return _questionRepository.GetAll();
    }

    public (List<Question> Questions, int Total, int Page, int Limit, int TotalPages) GetPaginated(int page, int limit)
    {
        var (questions, total) = _questionRepository.GetPaginated(page, limit);
        return (questions, total, page, limit, (int)Math.Ceiling((double)total / limit));
    }

    public List<Question> Search(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            throw new ArgumentException("Search query is required");
        return _questionRepository.Search(query);
    }

    public List<Question> GetHot(int limit)
    {
        return _questionRepository.GetHot(limit);
    }

    public Question GetById(string id)
    {
        var question = _questionRepository.GetById(id);
        if (question == null)
            throw new KeyNotFoundException("Question not found");
        return question;
    }

    public List<Question> GetRelated(string id, int limit)
    {
        return _questionRepository.GetRelated(id, limit);
    }

    public Question Update(string id, string title, string description, QuestionStatus status, string userId)
    {
        var existing = _questionRepository.GetById(id);
        if (existing == null)
            throw new KeyNotFoundException("Question not found");
        
        if (existing.UserId != userId)
            throw new UnauthorizedAccessException("You can only edit your own questions");
        
        existing.Title = title;
        existing.Description = description;
        existing.Status = status;
        
        return _questionRepository.Update(existing)!;
    }

    public void Delete(string id, string userId)
    {
        var existing = _questionRepository.GetById(id);
        if (existing == null)
            throw new KeyNotFoundException("Question not found");
        
        if (existing.UserId != userId)
            throw new UnauthorizedAccessException("You can only delete your own questions");
        
        _questionRepository.Delete(id);
    }
}
