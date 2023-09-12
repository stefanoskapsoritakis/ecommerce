namespace WebApi.Core.src.Shared
{
    public class QueryOptions
    {
        public string Search { get; set; } = string.Empty;
        public string OrderBy { get; set; } = "UpdatedAt";
        public bool OrderByDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PerPage { get; set; } = 10;

    }
}