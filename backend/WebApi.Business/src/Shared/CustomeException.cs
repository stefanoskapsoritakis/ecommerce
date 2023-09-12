namespace WebApi.Business.src.Shared
{
    public class CustomeException : Exception
    {
        public int StatusCode { get; set; }
        public string ErrorMessage { get; set; }

        public CustomeException(int statusCode = 500, string message = "Internal server error")
        {
            StatusCode = statusCode;
            ErrorMessage = message; 
        }

        public static CustomeException NotFoundException(string message = "Item cannot be found")
        {
            return new CustomeException(400, message);
        }
    }
}