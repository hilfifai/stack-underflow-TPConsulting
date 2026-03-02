using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories;

public class CommentRepository
{
    private readonly AppDbContext _context;

    public CommentRepository(AppDbContext context)
    {
        _context = context;
    }

    public Comment Create(Comment comment)
    {
        _context.Comments.Add(comment);
        _context.SaveChanges();
        return comment;
    }

    public List<Comment> GetByQuestionId(string questionId)
    {
        return _context.Comments
            .Where(c => c.QuestionId == questionId)
            .OrderBy(c => c.CreatedAt)
            .ToList();
    }

    public bool Delete(string id)
    {
        var comment = _context.Comments.Find(id);
        if (comment == null) return false;
        _context.Comments.Remove(comment);
        _context.SaveChanges();
        return true;
    }
}
