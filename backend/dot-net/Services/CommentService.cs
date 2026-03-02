using backend.Repositories;
using backend.Models;

namespace backend.Services;

public class CommentService
{
    private readonly CommentRepository _commentRepository;

    public CommentService(CommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public Comment Create(string content, string questionId, string userId, string username)
    {
        var comment = new Comment
        {
            Content = content,
            QuestionId = questionId,
            UserId = userId,
            Username = username
        };
        return _commentRepository.Create(comment);
    }

    public List<Comment> GetByQuestionId(string questionId)
    {
        return _commentRepository.GetByQuestionId(questionId);
    }

    public void Delete(string id)
    {
        if (!_commentRepository.Delete(id))
            throw new KeyNotFoundException("Comment not found");
    }
}
