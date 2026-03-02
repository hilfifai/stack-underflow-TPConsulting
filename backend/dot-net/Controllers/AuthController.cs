using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        try
        {
            var (token, user) = _authService.Login(request.Username, request.Password);
            return Ok(new { success = true, message = "Login successful", data = new { access_token = token, user } });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { success = false, message = ex.Message });
        }
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        try
        {
            var (id, username) = _authService.Register(request.Username, request.Password);
            return Ok(new { success = true, message = "Registration successful", data = new { id, username } });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpGet("data")]
    [Authorize]
    public IActionResult GetData()
    {
        var authHeader = Request.Headers.Authorization.FirstOrDefault();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return Unauthorized(new { success = false, message = "Authorization header required" });

        var token = authHeader.Substring("Bearer ".Length);
        var userData = _authService.GetUserData(token);

        if (userData == null)
            return Unauthorized(new { success = false, message = "Invalid token" });

        return Ok(new { success = true, message = "Success get user data", data = userData });
    }
}
