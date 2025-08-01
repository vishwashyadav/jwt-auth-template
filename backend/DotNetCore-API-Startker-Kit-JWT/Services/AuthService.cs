public class AuthService
{
    private readonly UserService _userService;
private readonly IConfiguration _configuration;
    public class LoginResponse
    {
        public string? Name { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
    }
    public AuthService(UserService userService, IConfiguration configuration)
    {
        _configuration = configuration;
        _userService = userService;
    }

    public async Task<User> RegisterUserAsync(User user)
    {
        if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
        {
            throw new ArgumentException("Invalid user data.");
        }

        // Save the user to the database
        return await _userService.RegisterUserAsync(user);
    }

    public async Task<LoginResponse?> AuthenticateAsync(string username, string password)
    {
        var user = await _userService.IsValidUserAsync(username, password);
        if (user == null)
        {
            return null; // Authentication failed
        }

        // Generate a token (for simplicity, returning a dummy token here)
        var token = JWTHelper.GenerateToken(user, _configuration);
        // Return LoginResponse object
        var response = new LoginResponse {
            Name = user.Username,
            Role = user.Role,
            Token = token
        };
        return response;
    }
}