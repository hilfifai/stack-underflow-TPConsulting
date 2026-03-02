using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories;

public class QuestionRepository
{
    private readonly AppDbContext _context;

    public QuestionRepository(AppDbContext context)
    {
        _context = context;
    }

    public Question Create(Question question)
    {
        _context.Questions.Add(question);
        _context.SaveChanges();
        return question;
    }

    public List<Question> GetAll()
    {
        return _context.Questions
            .Include(q => q.Comments)
            .OrderByDescending(q => q.CreatedAt)
            .ToList();
    }

    public (List<Question> Questions, int Total) GetPaginated(int page, int limit)
    {
        var skip = (page - 1) * limit;
        var questions = _context.Questions
            .Include(q => q.Comments)
            .OrderByDescending(q => q.CreatedAt)
            .Skip(skip)
            .Take(limit)
            .ToList();
        var total = _context.Questions.Count();
        return (questions, total);
    }

    public List<Question> Search(string query)
    {
        return _context.Questions
            .Include(q => q.Comments)
            .Where(q => q.Title.Contains(query) || q.Description.Contains(query))
            .OrderByDescending(q => q.CreatedAt)
            .ToList();
    }

    public List<Question> GetHot(int limit)
    {
        return _context.Questions
            .Include(q => q.Comments)
            .OrderByDescending(q => q.Comments.Count)
            .ThenByDescending(q => q.CreatedAt)
            .Take(limit)
            .ToList();
    }

    public Question? GetById(string id)
    {
        return _context.Questions
            .Include(q => q.Comments)
            .FirstOrDefault(q => q.Id == id);
    }

    public List<Question> GetRelated(string id, int limit)
    {
        return _context.Questions
            .Where(q => q.Id != id)
            .OrderByDescending(q => q.CreatedAt)
            .Take(limit)
            .ToList();
    }

    public Question? Update(Question question)
    {
        question.UpdatedAt = DateTime.UtcNow;
        _context.Questions.Update(question);
        _context.SaveChanges();
        return question;
    }

    public bool Delete(string id)
    {
        var question = _context.Questions.Find(id);
        if (question == null) return false;
        _context.Questions.Remove(question);
        _context.SaveChanges();
        return true;
    }
}
