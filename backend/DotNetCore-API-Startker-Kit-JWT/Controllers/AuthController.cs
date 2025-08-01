using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    public AuthController(AuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest user)
    {
        if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
        {
            return BadRequest("Invalid user data.");
        }

        try
        {
            var registeredUser = await _authService.RegisterUserAsync(new User { 
                Username = user.Username,
                Password = user.Password,
            });
        
            return Ok("User registered successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
        {
            return BadRequest("Invalid login request.");
        }

        var token = await _authService.AuthenticateAsync(loginRequest.Username, loginRequest.Password);
        if (token == null)
        {
            return Unauthorized();
        }

        return Ok(token);
    }
}