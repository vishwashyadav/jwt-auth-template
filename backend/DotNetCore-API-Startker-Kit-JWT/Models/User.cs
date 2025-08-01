public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; } // In a real application, passwords should be hashed
    public string Role { get; set; } // e.g., "Admin", "User"
}