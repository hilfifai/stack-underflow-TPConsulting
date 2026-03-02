using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories;

public class UserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public User? FindByUsername(string username)
    {
        return _context.Users.FirstOrDefault(u => u.Username == username);
    }

    public User? FindById(string id)
    {
        return _context.Users.FirstOrDefault(u => u.Id == id);
    }

    public User Create(string username, string password)
    {
        var user = new User
        {
            Username = username,
            Password = password
        };
        _context.Users.Add(user);
        _context.SaveChanges();
        return user;
    }
}
