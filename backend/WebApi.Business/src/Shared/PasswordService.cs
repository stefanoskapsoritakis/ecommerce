using System.Security.Cryptography;
using System.Text;

namespace WebApi.Business.src.Shared
{
    public class PasswordService
    {
        public static void HashPassword(string originalPassword, out string hashedPassword, out byte[] salt)
        {
            var hcam = new HMACSHA256();
            salt = hcam.Key;
            hashedPassword = Encoding.UTF8.GetString(hcam.ComputeHash(Encoding.UTF8.GetBytes(originalPassword)));
        }

        public static bool VerifyPassword(string originalPassword, string hashedPassword, byte[] salt) 
        {
            var hcam = new HMACSHA256(salt);
            var hashedOriginal = Encoding.UTF8.GetString(hcam.ComputeHash(Encoding.UTF8.GetBytes(originalPassword)));
            return hashedOriginal == hashedOriginal;
        }
    }
}