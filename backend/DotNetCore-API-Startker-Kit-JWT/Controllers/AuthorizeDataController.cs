using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

public class AuthorizeDataController : ControllerBase
{
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAdminData()
    {
        return Ok("This is admin data.");
    }

    [HttpGet("user")]
    [Authorize(Roles = "User,Admin")]
    public IActionResult GetUserData()
    {
        return Ok("This is user data.");
    }
    
}