using Microsoft.VisualBasic;

public class UserService
{
    private static List<User> _users = new List<User>
    {
        new User { Id = 1, Username = "admin", Password = "password", Role = "Admin" },
        new User { Id = 2, Username = "user", Password = "password", Role = "User" }
    };


    public async Task<User> RegisterUserAsync(User user)
    {
        var existingUser = _users.FirstOrDefault(u => u.Username == user.Username);
        if (existingUser != null)
        {
            throw new Exception("User already exists.");
        }
        user.Role = string.IsNullOrEmpty(user.Role) ? "User" : user.Role; // Default to User if no role is provided
        user.Id = _users.Max(u => u.Id) + 1; // Simple ID generation
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password); // Hash the password
        _users.Add(user);
        return await Task.FromResult(user);
    }   

    public async Task<User> IsValidUserAsync(string username, string password)
    {
        var user = _users.FirstOrDefault(u => u.Username == username);
        if (user == null)
        {
            return null; // Authentication failed
        }
        var hashPassword = BCrypt.Net.BCrypt.HashPassword(password); // Hash the password
        if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
        {   
            return null; // Password does not match
        }

        // Generate a token (for simplicity, returning a dummy token here)
        return await Task.FromResult(user);
    }
}