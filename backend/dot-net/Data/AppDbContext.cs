using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Username).IsUnique();
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User).WithMany(u => u.Questions).HasForeignKey(e => e.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Question).WithMany(q => q.Comments).HasForeignKey(e => e.QuestionId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.User).WithMany(u => u.Comments).HasForeignKey(e => e.UserId).OnDelete(DeleteBehavior.Cascade);
        });
    }
}
