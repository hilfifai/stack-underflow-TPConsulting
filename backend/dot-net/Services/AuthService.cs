using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using backend.Repositories;
using backend.Models;

namespace backend.Services;

public class AuthService
{
    private readonly UserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(UserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    private string GenerateJwtToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: new[]
            {
                new System.Security.Claims.Claim("userId", user.Id),
                new System.Security.Claims.Claim("username", user.Username)
            },
            expires: DateTime.UtcNow.AddMinutes(1440),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public (string Token, object User) Login(string username, string password)
    {
        var user = _userRepository.FindByUsername(username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            throw new UnauthorizedAccessException("Invalid username or password");

        var token = GenerateJwtToken(user);
        return (token, new { id = user.Id, username = user.Username });
    }

    public object? GetUserData(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]!);
            
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"]
            }, out var validatedToken);

            return (validatedToken as JwtSecurityToken)?.Claims.ToDictionary(c => c.Type, c => c.Value as object);
        }
        catch
        {
            return null;
        }
    }

    public (string Id, string Username) Register(string username, string password)
    {
        if (_userRepository.FindByUsername(username) != null)
            throw new InvalidOperationException("Username already exists");

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
        var user = _userRepository.Create(username, hashedPassword);
        return (user.Id, user.Username);
    }
}
